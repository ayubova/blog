import {isValidObjectId} from "mongoose";
import {NextRequest, NextResponse} from "next/server";
import Post from "models/Post";
import {isAuth} from "lib/utils";

export const GET = async (req:NextRequest) => {
  const user = await isAuth();
  const {searchParams} = new URL(req.url)
  const postId = searchParams.get("postId");
  console.log("postId: ", postId)
  if (!isValidObjectId(postId)) {
    return new Response("Invalid post id", {status: 422})  
  }
  const post = await Post.findById(postId).select("likes");

  if (!post) {
    return  new Response("Post not found", {status: 404})  
  }

  const postLikes = post.likes || [];

  if (!user) {
    return new Response(JSON.stringify({likesCount: postLikes.length, likedByOwner: false}));
  } else {
    return new Response(JSON.stringify({
      likesCount: postLikes.length,
      likedByOwner: postLikes.includes(user.id as any),
    }));
  }
};


export const POST = async (req:NextRequest, res: NextResponse) => {
  const user = await isAuth();

  const {searchParams} = new URL(req.url)
  const postId = searchParams.get("postId");

  if (!user){
    return new Response("Unauthorized request", {status: 403})  
  } 

  if (!isValidObjectId(postId)) {
    return new Response("Invalid post id", {status: 422})  
  }

  const post = await Post.findById(postId).select("likes");

  if (!post) {
    return  new Response("Post not found", {status: 404})  
  }

  const oldLikes = post.likes || [];
  const likedBy = user.id as any;

  if (oldLikes.includes(likedBy)) {
    post.likes = oldLikes.filter(
      (like) => like.toString() !== likedBy.toString()
    );
  } else {
    post.likes = [...oldLikes, likedBy];
  }

  await post.save();

  return new Response(JSON.stringify({newLikes: post.likes.length}),  {status: 201});

};
