import PostContent from "components/common/PostContent";
import dbConnect from "lib/dbConnect";
import Post from "models/Post";
import {PostContent as PostContentInterface} from "types";

const getPost = async (params: {
  slug: string;
}): Promise<PostContentInterface | null> => {
  try {
    await dbConnect();
    const post = await Post.findOne({slug: params?.slug});

    if (!post) {
      return null;
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

    return {
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
    };
  } catch (error: any) {
    return null;
  }
};

type Params = {
  slug: string;
};

type Props = {
  params: Params;
};

export const generateStaticParams = async (): Promise<Params[]> => {
  try {
    await dbConnect();
    const posts = await Post.find().select("slug");
    return posts.map(({slug}: Params) => ({slug}));
  } catch (error) {
    return [{slug: "/"}];
  }
};

export default async function PostPage({params}: Props) {
  const post = await getPost(params);
  if (post) return <PostContent post={post} />;
}
