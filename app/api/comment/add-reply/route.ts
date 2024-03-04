import {isValidObjectId} from "mongoose";
import {NextRequest} from "next/server";
import dbConnect from "lib/dbConnect";
import {formatComment, isAuth} from "lib/utils";
import {commentValidationSchema, validateSchema} from "lib/validator";
import Comment from "models/Comment";

export const POST = async (req:NextRequest) => {
  const user = await isAuth();
  if (!user) return new Response("Unauthorized request", {status: 403})
  const body = await req.json()
  const error = validateSchema(commentValidationSchema, body);
  if (error) return new Response(error, {status: 422});

  const {repliedTo} = body;
  if (!isValidObjectId(repliedTo))
    return new Response("Invalid comment id", {status: 422});

  await dbConnect();

  const chiefComment = await Comment.findOne({
    _id: repliedTo,
    chiefComment: true,
  });
  if (!chiefComment)
    return new Response("Comment not found", {status: 404});

  const replyComment = new Comment({
    owner: user.id,
    repliedTo,
    content: body.content,
  });

  if (chiefComment.replies)
    chiefComment.replies = [...chiefComment.replies, replyComment._id];

  await chiefComment.save();
  await replyComment.save();

  const finalComment = await replyComment.populate("owner");

  return new Response(JSON.stringify({comment: formatComment(finalComment, user)}), {status: 201});
};
