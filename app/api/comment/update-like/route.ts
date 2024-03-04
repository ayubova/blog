import {isValidObjectId} from "mongoose";
import {NextRequest} from "next/server";
import dbConnect from "lib/dbConnect";
import {formatComment, isAuth} from "lib/utils";
import Comment from "models/Comment";

export const POST = async (req:NextRequest) => {
  const user = await isAuth();
  if (!user) return new Response("Unauthorized request", {status: 403})

  const body = await req.json();

  const {commentId} = body;

  if (!isValidObjectId(commentId))
    return new Response("Invalid comment id", {status: 422});

  await dbConnect();

  const comment = await Comment.findById(commentId)
    .populate({
      path: "owner",
      select: "name avatar",
    })
    .populate({
      path: "replies",
      populate: {
        path: "owner",
        select: "name avatar",
      },
    });

  if (!comment) return new Response("Comment not found", {status: 404});

  const oldLikes = comment.likes || [];
  const likedBy = user.id as any;

  if (oldLikes.includes(likedBy)) {
    comment.likes = oldLikes.filter(
      (like) => like.toString() !== likedBy.toString()
    );
  } else comment.likes = [...oldLikes, likedBy];

  await comment.save();
  return new Response(JSON.stringify({
    comment: {
      ...formatComment(comment, user),
      replies: comment.replies?.map((reply: any) => formatComment(reply, user)),
    },
  }), {status:201});
};
