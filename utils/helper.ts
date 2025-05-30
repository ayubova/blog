import {Post} from "../components/editor";
import {PostDetail} from "types";

export const generateFormData = (post: Post) => {
  const formData = new FormData();
  for (const key in post) {
    const value = (post as any)[key];

    if (key === "tags") {
      let tags: string[] = [];

      if (typeof value === "string") {
        tags = value.split(",").map((tag: string) => tag.trim());
      } else if (Array.isArray(value)) {
        tags = value.map((tag) => tag.toString().trim());
      }

      formData.append("tags", JSON.stringify(tags));
    } else {
      formData.append(key, value);
    }
  }

  return formData;
};


export const filterPosts = (posts: PostDetail[], postToFilter: PostDetail) => {
  return posts.filter((post) => {
    return post.id !== postToFilter.id;
  });
};

export const trimText = (text: string, trimBy: number) => {
  if (text.length <= trimBy) return text;
  return text.substring(0, trimBy).trim() + "...";
};
