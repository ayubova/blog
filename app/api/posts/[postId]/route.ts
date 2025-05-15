import {isValidObjectId} from "mongoose";
import {NextRequest} from "next/server";
import {S3, PutObjectCommand} from "@aws-sdk/client-s3";
import {isAdmin} from "lib/utils";
import {postValidationSchema, validateSchema} from "lib/validator";
import Post from "models/Post";


const s3Client = new S3({
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  endpoint: process.env.DO_SPACES_URL as string,
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.DO_SPACES_ID as string,
    secretAccessKey: process.env.DO_SPACES_SECRET as string
  }
});

export const DELETE = async (req:NextRequest, {params}: { params: { postId: string }}) => {
  try {
    const admin = await isAdmin();
    if (!admin)  return new Response("unauthorized request", {status: 401})

    const {postId} = params;
    const post = await Post.findByIdAndDelete(postId);

    if (!post) return new Response("Post not found", {status: 404})

    return new Response(JSON.stringify({removed: true}))
  } catch (error: any) {
    return new Response(error.message, {status: 500})
  }
};

export const PATCH = async (req: NextRequest, {params}: { params: { postId: string } }) => {
  try {
    const admin = await isAdmin();
    if (!admin) return new Response("unauthorized request", {status: 401});

    const {postId} = params;

    if (!isValidObjectId(postId)) {
      return new Response("Invalid post id", {status: 422});
    }

    const post = await Post.findById(postId);
    if (!post) return new Response("Post not found", {status: 404});

    const formData = await req.formData();
    const body = Object.fromEntries(formData);

    let tags = [];
    try {
      const parsedTags = JSON.parse(body.tags as string);
      tags = Array.isArray(parsedTags) ? parsedTags : [parsedTags];
    } catch (err) {
      return new Response("Invalid tags format", {status: 400});
    }
    

    const error = validateSchema(postValidationSchema, {...body, tags});
    if (error) return new Response(error, {status: 400});

    const {title, content, meta, slug, draft} = body;

    post.title = title as string;
    post.content = content as string;
    post.meta = meta as string;
    post.tags = tags;
    post.slug = slug as string;
    post.draft = draft as string;

    const thumbnailFile = formData.get("thumbnail");
    if (thumbnailFile && typeof thumbnailFile !== "string") {
      const file = await (thumbnailFile as File).arrayBuffer();
      const buffer = Buffer.from(file);

      const bucketParams = {
        Bucket: process.env.DO_SPACES_BUCKET as string,
        Key: (thumbnailFile as File).name,
        Body: buffer,
        ACL: "public-read",
      };

      const data = await s3Client.send(new PutObjectCommand(bucketParams));
      console.log("Successfully uploaded object: ", data);

      const url = `https://${process.env.DO_SPACES_BUCKET}.nyc3.cdn.digitaloceanspaces.com/${(thumbnailFile as File).name}`;
      post.thumbnail = {url};
    }

    await post.save();

    return new Response(JSON.stringify({post}), {
      headers: {"Content-Type": "application/json"}
    });
  } catch (error: any) {
    console.log("update error", error);
    return new Response(error.message, {status: 500});
  }
};