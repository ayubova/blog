import {isValidObjectId} from "mongoose";
import {NextRequest} from "next/server";
import dbConnect from "lib/dbConnect";
import {formatComment, isAuth} from "lib/utils";
import Comment from "models/Comment";
import Post from "models/Post";
import {CommentResponse} from "types";

export const POST = async (req:NextRequest) => {
  const user = await isAuth();
  if (!user) return new Response("Unauthorized request", {status: 403})

  await dbConnect();
  const {belongsTo, content} = await req.json();

  const post = await Post.findById(belongsTo);
  if (!post) return new Response("Invalid post", {status: 401})

  const comment = new Comment({
    content,
    belongsTo,
    owner: user.id,
    chiefComment: true,
  });

  await comment.save();
  const commentWithOwner = await comment.populate("owner");
  return new Response(JSON.stringify({comment: formatComment(commentWithOwner, user)}), {status: 201})
};

export const DELETE = async (req: NextRequest) => {
  const user = await isAuth();
  if (!user) return new Response("Unauthorized request", {status: 403})

  const {searchParams} = new URL(req.url)
  const commentId = searchParams.get("commentId");

  if (!commentId || !isValidObjectId(commentId))
    return new Response("Invalid request", {status: 422});

  const comment = await Comment.findOne({
    _id: commentId,
    owner: user.id,
  });
  if (!comment) return new Response("Comment not found", {status: 404})

  if (comment.chiefComment) await Comment.deleteMany({repliedTo: commentId});
  else {
    const chiefComment = await Comment.findById(comment.repliedTo);
    if (chiefComment?.replies?.includes(commentId as any)) {
      chiefComment.replies = chiefComment.replies.filter(
        (cId) => cId.toString() !== commentId
      );

      await chiefComment.save();
    }
  }

  await Comment.findByIdAndDelete(commentId);
  return new Response(JSON.stringify({removed: true}));
};

export const PATCH = async (req:NextRequest) => {
  const user = await isAuth();
  if (!user) return new Response("Unauthorized request", {status: 403})

  const {searchParams} = new URL(req.url)
  const commentId = searchParams.get("commentId");

  if (!commentId)
    return new Response("Invalid request", {status: 422});

  const comment = await Comment.findOne({
    _id: commentId,
    owner: user.id,
  }).populate("owner");
  if (!comment) return new Response("Comment not found", {status: 404});

  const {content} = await req.json();

  comment.content = content;
  await comment.save();

  return new Response(JSON.stringify({comment: formatComment(comment)}));
};


export const GET = async (req:NextRequest) =>  {
  const {searchParams} = new URL(req.url)
  const belongsTo = searchParams.get("belongsTo");

  const user = await isAuth();
  if (!belongsTo || !isValidObjectId(belongsTo))
    return new Response("Invalid request", {status: 422})

  const comments = await Comment.find({belongsTo})
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

  if (!comments) return new Response(JSON.stringify({comments: comments}))

  const formattedComment: CommentResponse[] = comments.map((comment) => ({
    ...formatComment(comment, user),
    replies: comment.replies?.map((c: any) => formatComment(c, user)),
  }));
  return new Response(JSON.stringify({comments: formattedComment}))  
};
