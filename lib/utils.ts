import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import Post, { PostModelSchema } from "../models/Post";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { PostDetail, UserProfile, CommentResponse } from "types";
import dbConnect from "./dbConnect";
import { IComment } from "models/Comment";

interface FormidablePromise<T> {
  files: formidable.Files;
  body: T;
}

export const readFile = <T extends object>(
  req: NextApiRequest
): Promise<FormidablePromise<T>> => {
  const form = formidable();
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);

      resolve({ files, body: fields as T });
    });
  });
};

export const readPostsFromDb = async (
  limit: number,
  pageNo: number,
  tag?: string
) => {
  if (!limit || limit > 30)
    throw Error("Please use limit under 30 and a valid pageNo");

  await dbConnect();

  const total = await Post.countDocuments(
    tag
      ? {
          tags: { $in: [tag] },
        }
      : {}
  ).exec();

  const posts = await Post.find(
    tag
      ? {
          tags: { $in: [tag] },
        }
      : {}
  )
    .sort({ createdAt: "desc" })
    .select("-content")
    .skip(pageNo * limit)
    .limit(limit);

  return { posts, total };
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

export const isAdmin = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  const user = session?.user as UserProfile;
  return user && user.role === "admin";
};

export const isAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);
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
    owner: { id: owner._id, name: owner.name, avatar: owner.avatar },
    repliedTo: comment?.repliedTo?.toString(),
    likedByOwner: user ? getLikedByOwner(comment.likes, user) : false,
  };
};
