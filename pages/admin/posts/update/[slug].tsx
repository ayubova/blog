import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from "next";
import {useState} from "react";
import Editor, {Post} from "components/editor";
import AdminLayout from "components/layout/AdminLayout";
import dbConnect from "lib/dbConnect";
import PostModel from "models/Post";
import {generateFormData} from "utils/helper";
import {updatePost} from "api";
interface PostResponse extends Post {
  id: string;
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Update: NextPage<Props> = ({post}) => {
  const [updating, setUpdating] = useState(false);
  const handleSubmit = async (post: Post) => {
    setUpdating(true);
    try {
      const formData = generateFormData(post);

      const {data} = await updatePost(post.id!, formData);
      console.log("update success", data);
    } catch (error: any) {
      console.log(error.response.data);
    }
    setUpdating(false);
  };

  return (
    <AdminLayout title="Update">
      <div className="max-w-4xl mx-auto">
        <Editor
          initialValue={post}
          onSubmit={handleSubmit}
          busy={updating}
          btnTitle="Update"
        />
      </div>
    </AdminLayout>
  );
};

interface ServerSideResponse {
  post: PostResponse;
}
export const getServerSideProps: GetServerSideProps<
  ServerSideResponse
> = async (context) => {
  try {
    const slug = context.query.slug as string;

    await dbConnect();
    const post = await PostModel.findOne({slug});
    if (!post) return {notFound: true};

    const {_id, meta, title, content, thumbnail, tags, draft} = post;

    return {
      props: {
        post: {
          id: _id.toString(),
          title,
          content,
          tags: tags.join(", "),
          thumbnail: thumbnail?.url || "",
          slug,
          meta,
          draft: draft || "false",
        },
      },
    };
  } catch (error) {
    return {notFound: true};
  }
};

export default Update;
