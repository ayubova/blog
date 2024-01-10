import PostContent from "components/common/PostContent";
import dbConnect from "lib/dbConnect";
import {getPost} from "api";

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
    return posts.map(({slug}) => ({slug}));
  } catch (error) {
    return [{slug: "/"}];
  }}
 

export default async function Post({params}: Props) {
  const post = await getPost(params)
  return (
    <PostContent post={post}/>
  );
}
