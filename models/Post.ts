import {Schema, model, models, ObjectId, Model} from "mongoose";

export interface PostModelSchema {
  _id: ObjectId;
  title: string;
  slug: string;
  meta: string;
  content: string;
  tags: string[];
  thumbnail?: { url: string };
  author: ObjectId;
  createdAt: Date;
  likes?: ObjectId[];
  views?: number;
  draft: string;
}

const PostSchema = new Schema<PostModelSchema>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    tags: {
      type: [String],
      index: true,
    },
    thumbnail: {
      type: Object,
      url: String,
    },
    meta: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [{type: Schema.Types.ObjectId, ref: "User"}],
    views: {type: Number},
    draft: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Post = models?.Post || model("Post", PostSchema);

export default Post as Model<PostModelSchema>;
