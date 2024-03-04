import {NextRequest} from "next/server";
import {formatComment, isAdmin, isAuth} from "lib/utils";
import Comment from "models/Comment";
import {CommentResponse} from "types";

export const GET = async (req:NextRequest) => {
  const user = await isAuth();
  const admin = await isAdmin();
  if (!admin) return new Response("Unauthorized request", {status: 403});

  const {searchParams} = new URL(req.url)
  const limit = searchParams.get("limit") || "5";
  const pageNo = searchParams.get("pageNo") || "0";

  const total = await Comment.countDocuments().exec();

  const comments = await Comment.find({})
    .limit(parseInt(limit))
    .skip(parseInt(limit) * parseInt(pageNo))
    .sort({createdAt: "desc"})
    .populate("owner")
    .populate({
      path: "replies",
      populate: {
        path: "owner",
        select: "name avatar",
      },
    });

  if (!comments) return new Response(JSON.stringify({comment: comments}));

  const formattedComments: CommentResponse[] = comments.map((comment) => ({
    ...formatComment(comment, user),
    replies: comment.replies?.map((c: any) => formatComment(c, user)),
  }));

  return new Response(JSON.stringify({comments: formattedComments, total}));
};
