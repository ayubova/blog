import { useState, useCallback, useEffect } from "react";
import {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
} from "next";
import Link from "next/link";
import parse from "html-react-parser";
import Image from "next/image";
import dateFormat from "dateformat";
import { signIn } from "next-auth/react";
import axios from "axios";

import DefaultLayout from "components/layout/DefaultLayout";
import Comments from "components/common/Comments";
import LikeHeart from "components/common/LikeHeart";
import AuthorInfo from "components/common/AuthorInfo";
import Share from "components/common/Share";

import dbConnect from "lib/dbConnect";
import Post from "models/Post";
import User from "models/User";
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
    author,
    slug,
    relatedPosts,
  } = post;

  const user = useAuth();

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
      <div className="lg:px-0 px-5">
        {thumbnail ? (
          <div className="relative aspect-video">
            <Image src={thumbnail} alt={title} layout="fill" />
          </div>
        ) : null}

        <h1 className="text-6xl font-semibold text-primary-dark dark:text-primary py-2">
          {title}
        </h1>

        <div className="flex items-center justify-between py-2 text-secondary-dark dark:text-secondary-light">
          {tags.map((t, index) => (
            <span key={t + index}>#{t}</span>
          ))}
          <span>{dateFormat(createdAt, "d-mmm-yyyy")}</span>
        </div>

        <div className="py-5 dark:bg-primary-dark bg-primary sticky top-0 z-50">
          <Share url={`https://www.ayubova.com/${slug}`} />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-full mx-auto">
          {parse(content)}
        </div>

        <div className="py-10">
          <LikeHeart
            label={getLikeLabel()}
            onClick={handleLike}
            liked={likes.likedByOwner}
            busy={liking}
          />
        </div>

        <div className="pt-10">
          <AuthorInfo profile={JSON.parse(author)} />
        </div>

        <div className="pt-5">
          <h3 className="text-xl font-semibold bg-secondary-dark text-primary p-2 mb-4">
            Related posts:
          </h3>
          <div className="flex flex-col space-y-4">
            {relatedPosts.map((post) => (
              <Link href={post.slug} key={post.slug}>
                <a className="font-semibold text-primary-dark dark:text-primary hover:underline">
                  {post.title}
                </a>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <Comments belongsTo={id} />
        </div>
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
    author: string;
    relatedPosts: { id: string; title: string; slug: string }[];
  };
}

export const getStaticProps: GetStaticProps<
  StaticPropsResponse,
  { slug: string }
> = async ({ params }) => {
  try {
    await dbConnect();
    const post = await Post.findOne({ slug: params?.slug }).populate("author");
    if (!post) {
      return { notFound: true };
    }

    const posts = await Post.find({
      tags: { $in: [...post.tags] },
      _id: { $ne: post._id },
    })
      .sort({ createdAt: "desc" })
      .limit(5)
      .select("slug title");

    const relatedPosts = posts.map(({ _id, title, slug }) => ({
      id: _id.toString(),
      title: title,
      slug: slug,
    }));

    const {
      _id,
      title,
      meta,
      content,
      slug,
      tags,
      thumbnail,
      createdAt,
      author,
    } = post;

    const admin = await User.findOne({ role: "admin" });

    const authorInfo = (author || admin) as any;

    const postAuthor = {
      id: authorInfo._id,
      name: authorInfo.name,
      avatar: authorInfo.avatar,
      message: `This post is written by ${authorInfo.name}`,
    };

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
          author: JSON.stringify(postAuthor),
          relatedPosts,
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
