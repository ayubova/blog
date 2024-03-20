import {NextRequest} from "next/server";
import dbConnect from "lib/dbConnect";
import Post from "models/Post";

export const GET = async (req:NextRequest, {params}: { params: { slug: string } }) => {
  try {
    await dbConnect();
    const post = await Post.findOne({slug: params?.slug});

    if (!post) {
      return new Response("Not found", {status: 404});
    }

    if (process.env.NODE_ENV !== "development") {
      post.views = (post.views ?? 0) + 1;
      await post.save();
    }

    const posts = await Post.find({
      tags: {$in: [...post.tags]},
      _id: {$ne: post._id},
    })
      .sort({createdAt: "desc"})
      .limit(5)
      .select("-content");

    const relatedPosts = posts.map(
      ({_id, title, slug, tags, meta, thumbnail, createdAt}) => ({
        id: _id.toString(),
        title,
        meta,
        slug,
        tags,
        thumbnail: thumbnail?.url || "",
        createdAt: createdAt.toString(),
      })
    );

    const {
      _id,
      title,
      meta,
      content,
      slug,
      tags,
      thumbnail,
      createdAt,
      views = 0,
    } = post;

    return new Response(JSON.stringify({
      id: _id.toString(),
      title,
      meta,
      content,
      slug,
      tags,
      thumbnail: thumbnail?.url || "",
      createdAt: createdAt.toString(),
      relatedPosts,
      views,
    }))
  } catch (error: any) {
    return new Response(error.message, {status: 500})
  }
};
