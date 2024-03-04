import {getServerSession} from "next-auth";
import Post, {PostModelSchema} from "../models/Post";
import {authOptions} from "../app/api/auth/[...nextauth]/route";
import dbConnect from "./dbConnect";
import {PostDetail, UserProfile, CommentResponse} from "types";
import {IComment} from "models/Comment";

export const readPostsFromDb = async (
  limit: number,
  pageNo: number,
  tag?: string,
  search?: string
) => {
  if (!limit || limit > 30)
    throw Error("Please use limit under 30 and a valid pageNo");

  await dbConnect();

  const getOptions = () => {
    let options = {};
    if(tag) {
      options = {...options, tags: {$in: [tag]}}
    }
    if (search) {
      options = {...options, title: {$regex: search, $options: "i"}}
    }
    return options
  }

  const selectOptions = getOptions()

  
  const total = await Post.countDocuments(selectOptions).exec();

  const posts = await Post.find(selectOptions)
    .sort({createdAt: "desc"})
    .select("-content")
    .skip(pageNo * limit)
    .limit(limit);

  return {posts, total};
};

export const getTagsCollection = async () => {
  await dbConnect();
  const tags = await Post.distinct("tags");
  return tags.filter((tag) => !!tag);
};

export const formatPosts = (posts: PostModelSchema[]): PostDetail[] => {
  return posts.map((post) => ({
    id: post._id.toString(),
    title: post.title,
    slug: post.slug,
    createdAt: post.createdAt.toString(),
    thumbnail: post.thumbnail?.url || "",
    meta: post.meta,
    tags: post.tags,
    views: post.views || 0,
    draft: post.draft || "false",
  }));
};

export const isAdmin = async () => {
  const session = await getServerSession( authOptions);
  const user = session?.user as UserProfile;
  return user && user.role === "admin";
};

export const isAuth = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (user) {
    return user as UserProfile;
  }
};

const getLikedByOwner = (likes: any[], user: UserProfile) =>
  likes.includes(user.id);

export const formatComment = (
  comment: IComment,
  user?: UserProfile
): CommentResponse => {
  const owner = comment.owner as any;
  return {
    id: comment._id.toString(),
    content: comment.content,
    likes: comment.likes.length,
    chiefComment: comment?.chiefComment || false,
    createdAt: comment.createdAt?.toString(),
    owner: {id: owner._id, name: owner.name, avatar: owner.avatar},
    repliedTo: comment?.repliedTo?.toString(),
    likedByOwner: user ? getLikedByOwner(comment.likes, user) : false,
  };
};
