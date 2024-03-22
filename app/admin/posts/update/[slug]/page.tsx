"use client"

import {NextPage} from "next";
import {useState, useEffect} from "react";
import {toast} from "react-toastify"
import Editor, {Post} from "components/editor";
import AdminLayout from "app/layout/AdminLayout";
import {generateFormData} from "utils/helper";
import {updatePost, getPost} from "api";

type Params = {
  slug: string;
};

type Props = {
  params: Params;
};

const Update: NextPage<Props> = ({params}) => {
  const [post, setPost] = useState()
  const [updating, setUpdating] = useState(false);
  const handleSubmit = async (post: Post) => {
    setUpdating(true);
    try {
      const formData = generateFormData(post);
      const {data} = await updatePost(post.id!, formData);
      console.log("update success", data);
      toast.success("Post is updated");
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
    setUpdating(false);
  };

  useEffect(()=> {
    getPost(params).then((post) => setPost(post))
  }, [])

  return (
    <AdminLayout title="Update">
      <div className="max-w-4xl mx-auto">
        {post &&  (
          <Editor
            initialValue={post}
            onSubmit={handleSubmit}
            busy={updating}
            btnTitle="Update"
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default Update;
