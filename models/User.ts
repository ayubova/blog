import { Schema, models, model, Model } from "mongoose";

export interface UserModelSchema {
  name: string;
  email: string;
  role: "user" | "admin";
  provider: "github" | "google";
  avatar?: string;
}

const UserSchema = new Schema<UserModelSchema>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    provider: {
      type: String,
      enum: ["github", "google"],
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = models?.User || model("User", UserSchema);

export default User as Model<UserModelSchema>;
