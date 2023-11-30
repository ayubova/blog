import axios from "axios";

export const getPosts = (query: string) => axios(`/api/posts?${query}`);

export const deletePost = (id: string) => axios.delete(`/api/posts/${id}`);

export const updatePost = (id: string, formData: FormData) =>
  axios.patch("/api/posts/" + id, formData);

export const getComments = (pageNo: number, limit: number) =>
  axios(`/api/comments/all?pageNo=${pageNo}&limit=${limit}`);

export const getLatestComments = () => axios("/api/comment/latest");

export const postComment = (content: string, belongsTo?: string) =>
  axios.post("/api/comment", {content, belongsTo});

export const addReplyComment = (replyComment: {
  content: string;
  repliedTo: string;
}) => axios.post("/api/comment/add-reply", replyComment);

export const updateComment = (content: string, id: string) =>
  axios.patch(`/api/comment?commentId=${id}`, {content});

export const deleteComment = (id: string) =>
  axios.delete(`/api/comment?commentId=${id}`);

export const likeComment = (commentId: string) =>
  axios.post("/api/comment/update-like", {commentId});

export const getCommentByPostId = (postId: string) =>
  axios(`/api/comment?belongsTo=${postId}`);

export const getImages = () => axios("/api/image");

export const uploadImage = (formData: FormData) =>
  axios.post("/api/image", formData);

export const getInterviewStats = () => axios("/api/challenge/interview");

export const postInterviewStats = (timeSpent: number, category: string) =>
  axios.post("/api/challenge/interview", {timeSpent, category});

export const getUsers = (pageNo?: number, limit?: number) =>
  axios(`/api/users?pageNo=${pageNo}&limit=${limit}`);

export const createPost = (formData: FormData) =>
  axios.post("/api/posts", formData);

export const searchPosts = (title: string) =>
  axios(`/api/posts/search?title=${title}`);

export const getLikesByPostId = (id: string) =>
  axios(`api/posts/like-status?postId=${id}`);

export const setLikeByPostId = (id: string) =>
  axios.post(`/api/posts/update-like?postId=${id}`);