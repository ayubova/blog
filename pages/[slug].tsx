import {useState, useCallback, useEffect} from "react";
import {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
} from "next";
import Image from "next/image";
import dateformat from "dateformat";
import {BsCalendar} from "react-icons/bs";
import {BiBarChartAlt} from "react-icons/bi";
import axios from "axios";
import Link from "next/link";
import parse, {Element} from "html-react-parser";
import AuthModal from "components/common/AuthModal";
import DefaultLayout from "components/layout/DefaultLayout";
import Comments from "components/common/Comments";
import LikeHeart from "components/common/LikeHeart";
import PostCard from "components/common/PostCard";
import Share from "components/common/Share";
import {getTagsCollection} from "lib/utils";

import dbConnect from "lib/dbConnect";
import Post from "models/Post";
import useAuth from "hooks/useAuth";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PostPage: NextPage<Props> = ({post, tagsList}) => {
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

  const {user} = useAuth();
    
  const [likes, setLikes] = useState({likedByOwner: false, count: 0});
  const [liking, setLiking] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios(`api/posts/like-status?postId=${id}`)
      .then(({data}) =>
        setLikes({likedByOwner: data.likedByOwner, count: data.likesCount})
      )
      .catch((err) => console.error(err));
  }, [id]);

  const getLikeLabel = useCallback((): string => {
    const {likedByOwner, count} = likes;
    if (likedByOwner && count === 1) {
      return "You liked this post";
    }
    if (likedByOwner) {
      return `You and ${count - 1} liked this post`;
    }
    if (count === 0) {
      return "Like this post";
    }
    return `${count} likes`;
  }, [likes]);

  const handleLike = async () => {
    try {
      if (!user) {
        return setModalOpen(true);
      }
      setLiking(true);
      const {data} = await axios.post(`/api/posts/update-like?postId=${id}`);
      setLiking(false);
      setLikes({likedByOwner: !likes.likedByOwner, count: data.newLikes});
    } catch (error) {
      console.log(error);
      setLiking(false);
    }
  };

  return (
    <DefaultLayout title={title} desc={meta} tags={tagsList}>
      <div className="px-5 w-full lg:max-w-4xl pt-10 m-auto">

        <div className="flex items-center space-x-2 pb-10 justify-center">
          {tags.map((tagItem, index) => (
            <Link href={`/?tag=${tagItem}`} key={tagItem + index}>
              <span className={"border-b-2 border-action text-secondary-dark uppercase hover:text-primary-dark"}>
                {tagItem}
              </span>
            </Link>
          ))}
        </div>
 
        <h1 className="lg:text-5xl text-3xl text-center font-semibold font-heading text-primary-dark dark:text-primary-light pb-14">
          {title}
        </h1>

        {thumbnail ? (
          <div className="md:w-3/4 pb-10 m-auto ">
            <div className="relative aspect-video">
              <Image
                src={thumbnail}
                alt={title}
                fill={true}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw"
              />
            </div>
          </div>
        ) : null}

       
        <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-primary ">
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
        <div className="border-b pt-10"/>
        <div className="prose prose-lg dark:prose-invert max-w-full mx-auto pt-10 overflow-hidden break-words">
          {parse(content,
            {
              replace: (domNode) => {
                if (domNode instanceof Element && domNode.attribs) {
                  if (domNode.name === "img") {
                    return (
                      <Image
                        src={domNode.attribs.src}
                        alt={domNode.attribs.alt}
                        className="w-full h-auto max-w-4xl"
                        placeholder="blur"
                        blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8euxoPQAHeQLRGygqIwAAAABJRU5ErkJggg=="}
                        width="768"
                        height="400"
                        sizes="100vw"
                      />
                    )
                  }
                }
              }
            }
          )
          }
        </div>

        <div className="border-b pt-10"/>

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

        <div className="border-b"/>

        {!!relatedPosts.length && (
          <div className="py-10">
            <h3 className="font-heading text-2xl text-secondary-dark dark:text-secondary-light mb-10 flex justify-center">
                Recommended reading
            </h3>
            <div className="md:grid md:grid-cols-3 gap-4">
              {relatedPosts.map((post, index) => (
                <PostCard key={post.slug + index} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
      <AuthModal isOpen={modalOpen} handleClose={() => setModalOpen(false)}/>
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
  tagsList: string[]
}

export const getStaticProps: GetStaticProps<
  StaticPropsResponse,
  { slug: string }
> = async ({params}) => {
  try {
    await dbConnect();
    const post = await Post.findOne({slug: params?.slug});
    if (!post) {
      return {notFound: true};
    }

    const tagsList = await getTagsCollection();

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
        tagsList
      },
    };
  } catch (error) {
    return {notFound: true};
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    await dbConnect();
    const posts = await Post.find().select("slug");
    const paths = posts.map(({slug}) => {
      return {params: {slug}};
    });
    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    return {paths: [{params: {slug: "/"}}], fallback: false};
  }
};
