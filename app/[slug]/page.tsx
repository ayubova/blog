import PostContent from "components/common/PostContent";
import dbConnect from "lib/dbConnect";
import {getPost} from "api";
import Post from "models/Post";

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
  }}
 

export default async function PostPage({params}: Props) {
  const post = await getPost(params)
  return (
    <PostContent post={post}/>
  );
}
