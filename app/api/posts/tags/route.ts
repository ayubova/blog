import {NextApiHandler} from "next";
import Post from "models/Post";
import dbConnect from "lib/dbConnect";

export const GET: NextApiHandler = async () => {
  try {
    await dbConnect();
        
    const tags = await Post.distinct("tags");

    return new Response(JSON.stringify({tags}), {status: 200})
  } catch (error: any) {
    return new Response(error.message, {status: 500})
  }
};
