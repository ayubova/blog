import { useState, useCallback, useEffect } from "react";
import {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
} from "next";
import parse from "html-react-parser";
import Image from "next/image";
import dateformat from "dateformat";
import { BsCalendar } from "react-icons/bs";
import { BiBarChartAlt } from "react-icons/bi";
import { signIn } from "next-auth/react";
import axios from "axios";

import DefaultLayout from "components/layout/DefaultLayout";
import Comments from "components/common/Comments";
import LikeHeart from "components/common/LikeHeart";
import PostCard from "components/common/PostCard";
import Share from "components/common/Share";

import dbConnect from "lib/dbConnect";
import Post from "models/Post";
import useAuth from "hooks/useAuth";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PostPage: NextPage<Props> = ({ post }) => {
  const {
    id,
    title,
    content,
    meta,
    tags,
    thumbnail,
    createdAt,
    slug,
    relatedPosts,
    views,
  } = post;

  const { user } = useAuth();

  const [likes, setLikes] = useState({ likedByOwner: false, count: 0 });
  const [liking, setLiking] = useState(false);

  useEffect(() => {
    axios(`api/posts/like-status?postId=${id}`)
      .then(({ data }) =>
        setLikes({ likedByOwner: data.likedByOwner, count: data.likesCount })
      )
      .catch((err) => console.error(err));
  }, [id]);

  const getLikeLabel = useCallback((): string => {
    const { likedByOwner, count } = likes;
    if (likedByOwner && count === 1) {
      return "You liked this post";
    }
    if (likedByOwner) {
      return `You and ${count - 1} liked this post`;
    }
    if (count === 0) {
      return "Like this post";
    }
    return `${count} people liked this post`;
  }, [likes]);

  const handleLike = async () => {
    try {
      if (!user) {
        return await signIn("github");
      }
      setLiking(true);
      const { data } = await axios.post(`/api/posts/update-like?postId=${id}`);
      setLiking(false);
      setLikes({ likedByOwner: !likes.likedByOwner, count: data.newLikes });
    } catch (error) {
      console.log(error);
      setLiking(false);
    }
  };

  return (
    <DefaultLayout title={title} desc={meta}>
      <div className="px-5 w-full lg:max-w-5xl pt-10 m-auto">
        <h1 className="lg:text-4xl text-xl text-center font-semibold font-heading text-primary-dark dark:text-primary-light">
          {title}
        </h1>

        {thumbnail ? (
          <div className="md:w-3/4 md:py-8 py-4  m-auto ">
            <div className="relative aspect-video">
              <Image
                src={thumbnail}
                alt={title}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        ) : null}

        <div className="flex items-center space-x-2 text-xs pb-4">
          {tags.map((t, index) => (
            <div
              key={t + index}
              className="bg-secondary-main rounded text-secondary-dark h-5 flex items-center justify-center p-3"
            >
              {t}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-primary">
          <div className="text-secondary-dark flex items-center justify-between text-xs">
            <BsCalendar />
            <span className="ml-2">{dateformat(createdAt, "mmm d, yyyy")}</span>
          </div>
          {!!views && (
            <div className="text-secondary-main flex items-center justify-between text-xs font-semibold">
              <BiBarChartAlt />
              <span className="ml-2">{views + " views"}</span>
            </div>
          )}
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-full mx-auto md:pt-10 pt-5 overflow-hidden break-words">
          {parse(content)}
        </div>

        <div className="pt-10">
          <LikeHeart
            label={getLikeLabel()}
            onClick={handleLike}
            liked={likes.likedByOwner}
            busy={liking}
          />
        </div>

        <div className="pt-10">
          <Share url={`https://www.ayubova.com/${slug}`} />
        </div>

        <Comments belongsTo={id} />

        {!!relatedPosts.length && (
          <div className="py-10">
            <h3 className="font-heading font-semibold text-secondary-dark dark:text-secondary-light mb-4">
              Recommended:
            </h3>
            <div className="flex flex-col space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedPosts.map((post, index) => (
                  <PostCard key={post.slug + index} post={post} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default PostPage;

interface StaticPropsResponse {
  post: {
    id: string;
    title: string;
    content: string;
    meta: string;
    tags: string[];
    slug: string;
    thumbnail: string;
    createdAt: string;
    views?: number;
    relatedPosts: {
      id: string;
      title: string;
      meta: string;
      tags: string[];
      slug: string;
      thumbnail: string;
      createdAt: string;
    }[];
  };
}

export const getStaticProps: GetStaticProps<
  StaticPropsResponse,
  { slug: string }
> = async ({ params }) => {
  try {
    await dbConnect();
    const post = await Post.findOne({ slug: params?.slug });
    if (!post) {
      return { notFound: true };
    }

    if (process.env.NODE_ENV !== "development") {
      post.views = (post.views ?? 0) + 1;
      await post.save();
    }

    const posts = await Post.find({
      tags: { $in: [...post.tags] },
      _id: { $ne: post._id },
    })
      .sort({ createdAt: "desc" })
      .limit(5)
      .select("-content");

    const relatedPosts = posts.map(
      ({ _id, title, slug, tags, meta, thumbnail, createdAt }) => ({
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
      props: {
        post: {
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
        },
      },
      revalidate: 60,
    };
  } catch (error) {
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    await dbConnect();
    const posts = await Post.find().select("slug");
    const paths = posts.map(({ slug }) => {
      return { params: { slug } };
    });
    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    return { paths: [{ params: { slug: "/" } }], fallback: false };
  }
};
