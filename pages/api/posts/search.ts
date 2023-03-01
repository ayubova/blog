import { NextApiHandler } from "next";
import dbConnect from "lib/dbConnect";
import Post from "models/Post";
import { formatPosts } from "lib/utils";

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      return searchPosts(req, res);
    default:
      res.status(404).send("Not found");
  }
};

const searchPosts: NextApiHandler = async (req, res) => {
  const title = req.query.title as string;

  if (!title.trim()) {
    return res.status(400).json({ error: "Invalid search" });
  }

  await dbConnect();

  const posts = await Post.find({ title: { $regex: title, $options: "i" } });

  res.json({ results: formatPosts(posts) });
};

export default handler;
