import { isValidObjectId } from "mongoose";
import { NextApiHandler } from "next";
import Post from "models/Post";

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      return incrementPostView(req, res);
    default:
      res.status(404).send("Not found");
  }
};

const incrementPostView: NextApiHandler = async (req, res) => {
  const { postId } = req.query as { postId: string };
  if (!isValidObjectId(postId)) {
    return res.status(422).json({ error: "Invalid post id" });
  }
  const post = await Post.findById(postId).select("views");

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  post.views = (post.views || 0) + 1;

  await post.save();

  res.status(201).json({ viewsCount: post.views });
};

export default handler;
