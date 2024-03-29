export interface PostDetail {
  id: string;
  title: string;
  slug: string;
  meta: string;
  tags: string[];
  views?: number;
  thumbnail?: string;
  createdAt: string;
  draft?: string;
}

export interface IncomingPost {
  title: string;
  content: string;
  slug: string;
  meta: string;
  tags: string;
  draft?: string;
}

export interface PostContent {
  id: string;
  title: string;
  content: string;
  meta: string;
  tags: string[];
  slug: string;
  thumbnail: string;
  createdAt: string;
  views?: number;
  relatedPosts: {
    id: string;
    title: string;
    meta: string;
    tags: string[];
    slug: string;
    thumbnail: string;
    createdAt: string;
  }[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string | undefined;
  role: "user" | "admin";
}

export type ReplyComments = CommentResponse[];
export interface CommentResponse {
  id: string;
  content: string;
  createdAt: string;
  likes: number;
  likedByOwner?: boolean;
  replies?: ReplyComments;
  repliedTo?: string;
  chiefComment: boolean;
  owner: { name: string; id: string; avatar?: string };
}

export interface LatestComment {
  id: string;
  owner: { name: string; id: string; avatar?: string };
  content: string;
  belongsTo: { id: string; title: string; slug: string };
}

export interface LatestUserProfile {
  id: string;
  name: string;
  avatar?: string;
  provider: string;
  email: string;
  role: "user" | "admin";
}

export interface InterviewStat {
  _id: string;
  timeSpent: number;
  category: string;
  createdAt: string;
  updatedAt: string
}

export interface MonthlyData {
  label: string;
  totalTime: number;
  date: number;
}