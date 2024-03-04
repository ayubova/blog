import {isAdmin} from "lib/utils";
import Comment from "models/Comment";
import {LatestComment} from "types";

export const GET = async () => {
  const admin = await isAdmin();
  if (!admin) {
    return new Response("Unauthorized", {status: 403});
  }

  const limit = 5;

  const comments = await Comment.find({chiefComment: true})
    .populate({
      path: "owner",
    })
    .limit(limit)
    .sort("-createdAt")
    .populate({
      path: "belongsTo",
      select: "title slug",
    });

  const formattedComments: LatestComment[] = comments.map((comment: any) => ({
    id: comment._id,
    content: comment.content,
    owner: {
      id: comment.owner._id,
      name: comment.owner.name,
      avatar: comment.owner.avatar,
    },
    belongsTo: {
      id: comment.belongsTo._id,
      title: comment.belongsTo.title,
      slug: comment.belongsTo.slug,
    },
  }));
  return new Response(JSON.stringify({comments: formattedComments}));
};
