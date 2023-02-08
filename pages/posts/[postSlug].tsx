import {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
} from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ParsedUrlQuery } from "querystring";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SinglePage: NextPage<Props> = ({ post }) => {
  return (
    <div className="max-w-3xl mx-auto p-5">
      <h1 className="text-semibold text-2xl py-5">{post.title}</h1>
      <div className=" prose pb-20">
        <MDXRemote {...post.content} />
      </div>
    </div>
  );
};

interface IStaticProps extends ParsedUrlQuery {
  postSlug: string;
}

type Post = {
  post: {
    title: string;
    content: MDXRemoteSerializeResult;
  };
};

export const getStaticProps: GetStaticProps<Post> = async (context) => {
  try {
    const { params } = context;
    const { postSlug } = params as IStaticProps;
    const filePath = path.join(process.cwd(), "posts/" + postSlug + ".md");
    const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });
    const source: any = await serialize(fileContent, {
      parseFrontmatter: true,
    });

    return {
      props: { post: { content: source, title: source.frontmatter?.title } },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = () => {
  const dirPath = path.join(process.cwd(), "posts");
  const dirs = fs.readdirSync(dirPath);
  const paths = dirs.map((filename) => {
    const filePath = path.join(process.cwd(), "posts/" + filename);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });
    return { params: { postSlug: matter(fileContent).data.slug } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export default SinglePage;
