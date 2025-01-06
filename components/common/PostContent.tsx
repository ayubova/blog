"use client"
import {useState, useCallback, useEffect} from "react";
import {NextPage} from "next";
import Image from "next/image";
import dateformat from "dateformat";
import {BsCalendar} from "react-icons/bs";
//import {BiBarChartAlt} from "react-icons/bi";
import Link from "next/link";
import parse, {Element} from "html-react-parser";

import AuthModal from "components/common/AuthModal";
import {Comments} from "components/common/Comments";
import LikeHeart from "components/ui/LikeHeart";
import PostCard from "components/common/PostCard";
import Share from "components/common/Share";
import {PostContent} from "types"
import useAuth from "hooks/useAuth";
import {getLikesByPostId, setLikeByPostId} from "api";

type Props = {
    post: PostContent
};

const PostContentPage: NextPage<Props> = ({post}) => {
  const {
    id,
    title,
    content,
    // meta,
    tags,
    thumbnail,
    createdAt,
    slug,
    relatedPosts,
  } = post;
  const {user} = useAuth();

  const [likes, setLikes] = useState({likedByOwner: false, count: 0});
  const [liking, setLiking] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getLikesByPostId(id)
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
      const {data} = await setLikeByPostId(id);
      setLiking(false);
      setLikes({likedByOwner: !likes.likedByOwner, count: data.newLikes});
    } catch (error) {
      console.log(error);
      setLiking(false);
    }
  };

  return (
    <>
      <div className="px-5 w-full lg:max-w-4xl m-auto max-w-[100vw]">
        <div className="flex items-center space-x-2 pb-10 justify-center">
          {tags?.map((tagItem, index) => (
            <Link href={`/?tag=${tagItem}`} key={tagItem + index}>
              <span
                className={
                  "border-b-2 border-action text-secondary-dark uppercase hover:text-primary-dark"
                }
              >
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
          {/* {!!views && (
            <div className="text-secondary-main flex items-center justify-between text-xs font-semibold">
              <BiBarChartAlt />
              <span className="ml-2">{views + " views"}</span>
            </div>
          )} */}
        </div>
        <div className="border-b pt-10" />
        {content &&  (
          <div className="prose prose-lg dark:prose-invert max-w-full mx-auto pt-10 overflow-hidden break-words">
            {parse(content, {
              replace: (domNode) => {
                if (domNode instanceof Element && domNode.attribs) {
                  if (domNode.name === "img") {
                    return (
                      <Image
                        src={domNode.attribs.src}
                        alt={domNode.attribs.alt}
                        className="w-full h-auto max-w-4xl"
                        placeholder="blur"
                        blurDataURL={
                          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8euxoPQAHeQLRGygqIwAAAABJRU5ErkJggg=="
                        }
                        width="768"
                        height="600"
                        quality={70}
                      />
                    );
                  }
                }
              },
            })}
          </div>
        )}

        <div className="border-b pt-10" />

        <div className="pt-10">
          <LikeHeart
            label={getLikeLabel()}
            onClick={handleLike}
            liked={likes.likedByOwner}
            busy={liking}
          />
        </div>

        <div className="pt-10">
          <Share url={`https://www.ayubova.com/${slug}`} title={title} />
        </div>

        <Comments belongsTo={id} />

        <div className="border-b" />

        {!!relatedPosts?.length && (
          <div className="py-10">
            <h3 className="font-heading text-2xl text-secondary-dark dark:text-secondary-light mb-10 flex justify-center">
              Recommended reading
            </h3>
            <div className="md:grid md:grid-cols-3 gap-4">
              {relatedPosts?.map((post, index) => (
                <PostCard key={post.slug + index} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
      <AuthModal isOpen={modalOpen} handleClose={() => setModalOpen(false)} />
    </>
  );
};

export default PostContentPage;
