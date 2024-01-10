import {NextRequest} from "next/server";
import dbConnect from "lib/dbConnect";
import Post from "models/Post";
import {formatPosts} from "lib/utils";



export const GET = async (req:NextRequest) => {
  try {
    const {searchParams} = new URL(req.url)
    const title = searchParams.get("title") || "6";

    if (!title.trim()) {
      return new Response("Invalid search", {status: 400})
    }

    await dbConnect();

    const posts = await Post.find({title: {$regex: title, $options: "i"}});
    return new Response(JSON.stringify({results: formatPosts(posts)}))
  } catch (error: any) {
    return new Response(error.message, {status: 500})
  }
};
