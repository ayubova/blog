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

interface IncomingPost {
  title: string;
  content: string;
  slug: string;
  meta: string;
  tags: string;
  draft: string;
}

export const PATCH = async (req:NextRequest, {params}: { params: { postId: string }} ) => {
  const admin = await isAdmin();
  if (!admin)  return new Response("unauthorized request", {status: 401})
  const {postId} = params;

  if (!isValidObjectId(postId)) {
    return new Response("Invalid post id", {status: 422})  
  }

  const post = await Post.findById(postId);
  if (!post) return new Response("Post not found", {status: 404})

  const formData = await req.formData()

  let tags = [];
  const body = Object.fromEntries(formData);

  if (Array.isArray(body.tags)) tags = JSON.parse(body.tags as string);

  const error = validateSchema(postValidationSchema, {...body, tags});

  if (error) return  new Response(error, {status: 400})

  const {title, content, meta, slug, draft} = body;
  post.title = title;
  post.content = content;
  post.meta = meta;
  post.tags = tags;
  post.slug = slug;
  post.draft = draft;

  const thumbnailFile = formData.get("thumbnail")
 
  if (thumbnailFile && typeof thumbnailFile !== "string") {
    const file = await formData?.get("thumbnail")?.arrayBuffer()

    const bucketParams = {
      Bucket: process.env.DO_SPACES_BUCKET as string,
      Key: thumbnailFile?.name as string,
      Body: file,
      ACL:"public-read",
    };
    const data = await s3Client.send(new PutObjectCommand(bucketParams));
    console.log("Successfully uploaded object: " , data);
  
    const url = `https://${process.env.DO_SPACES_BUCKET}.nyc3.cdn.digitaloceanspaces.com/${thumbnailFile.name}`


    post.thumbnail = {url};
  }

  await post.save();
  return new Response(JSON.stringify({post}))
};


