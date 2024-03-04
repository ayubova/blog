"use client"
import {NextPage} from "next";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {toast} from "react-toastify";
import Editor, {Post} from "components/editor";
import AdminLayout from "components/layout/AdminLayout";
import {generateFormData} from "utils/helper";
import {createPost} from "api"


const Create: NextPage = () => {
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  const handleSubmit = async (post: Post) => {
    setCreating(true);
    try {
      const formData = generateFormData(post);
      const {data} = await createPost(formData);
      toast.success("New post is created");
      router.push("/admin/posts/update/" + data.post.slug);
    } catch (error: any) {
      toast.error(error.response.data);
      console.log(error.response.data);
    }
    setCreating(false);
  };

  return (
    <AdminLayout title="New Post">
      <div className="max-w-4xl mx-auto">
        <Editor onSubmit={handleSubmit} busy={creating} />
      </div>
    </AdminLayout>
  );
};

export default Create;
