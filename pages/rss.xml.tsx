/**
 * This is a dynamic RSS feed rendered on the server with all blog posts
 * We use SSG with a cache of a few minutes instead of statically generating the file because we want
 * new blog posts and edits to automatically show up here
 */

import { GetServerSideProps } from "next";
import getConfig from "next/config";
import { PATH_RSS } from "constants/paths";
import { PostDetail } from "types";

import RSS from "rss";

const { publicRuntimeConfig } = getConfig();
import { formatPosts, readPostsFromDb } from "lib/utils";

const limit = 20;
const pageNo = 0;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { posts } = await readPostsFromDb(limit, pageNo);
  const formattedPosts = formatPosts(posts);

  const feedOptions = {
    title: `Julia Ayubova's Blog`,
    description: "Welcome to this blog posts!",
    site_url: publicRuntimeConfig.SITE_URL,
    feed_url: `${publicRuntimeConfig.SITE_URL}/${PATH_RSS}`,
    pubDate: new Date(),
    copyright: `©${new Date().getFullYear()} Julia Ayubova`,
  };

  const feed = new RSS(feedOptions);

  formattedPosts.forEach((blogPost: PostDetail) => {
    feed.item({
      guid: blogPost.id,
      title: blogPost.title,
      description: blogPost.meta,
      url: `${publicRuntimeConfig.SITE_URL}/${blogPost.slug}`,
      date: new Date(blogPost.createdAt),
      categories: blogPost.tags.map((tag) => tag),
      enclosure: {
        url: blogPost.thumbnail || "",
      },
    });
  });

  const cacheMaxAgeUntilStaleSeconds = 60 * 60; // 1 minute
  const cacheMaxAgeStaleDataReturnSeconds = 60 * 60 * 60; // 60 minutes
  ctx.res.setHeader(
    "Cache-Control",
    `public, s-maxage=${cacheMaxAgeUntilStaleSeconds}, stale-while-revalidate=${cacheMaxAgeStaleDataReturnSeconds}`
  );

  ctx.res.setHeader("Content-Type", "text/xml");
  ctx.res.write(feed.xml());
  ctx.res.end();

  return { props: {} };
};

// Default export to prevent next.js errors
export default function RssPage() {}
