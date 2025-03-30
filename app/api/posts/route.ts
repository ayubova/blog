import {NextRequest} from "next/server";
import {S3, PutObjectCommand} from "@aws-sdk/client-s3";
import dbConnect from "lib/dbConnect";
import {formatPosts, readPostsFromDb, isAuth} from "lib/utils";
import Post from "models/Post";
import {postValidationSchema, validateSchema} from "lib/validator";


const s3Client = new S3({
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  endpoint: process.env.DO_SPACES_URL as string,
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.DO_SPACES_ID as string,
    secretAccessKey: process.env.DO_SPACES_SECRET as string
  }
});

export const POST = async (req:NextRequest) => {
  const user = await isAuth();
  const formData = await req.formData()

  let tags = [];

  const body = Object.fromEntries(formData);

  if (Array.isArray(body.tags)) tags = JSON.parse(body.tags as string);

  const error = validateSchema(postValidationSchema, {...body, tags});
  if (error) return new Response(error, {status: 400})

  const {title, content, slug, meta, draft} = body;

  await dbConnect();
  const alreadyExits = await Post.findOne({slug});
  if (alreadyExits)
    return new Response("Slug need to be unique", {status: 400})

  const newPost = new Post({
    title,
    content,
    slug,
    meta,
    tags,
    author: user?.id,
    draft,
  });

  const thumbnailFile = formData.get("thumbnail")
 
  if (thumbnailFile && typeof thumbnailFile !== "string") {
    //@ts-ignore
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


    newPost.thumbnail = {url};
  }

  await newPost.save();

  return new Response(JSON.stringify({post: newPost}))

};

export const GET = async (req:NextRequest) => {
  try {
    const user = await isAuth();

    const {searchParams} = new URL(req.url)
    const limit = searchParams.get("limit") || "6";
    const pageNo = searchParams.get("pageNo") || ""
    const tag = searchParams.get("tag") || ""
    const search = searchParams.get("search") || ""

    const {posts, total} = await readPostsFromDb(
      parseInt(limit),
      parseInt(pageNo),
      tag,
      search,
      user?.role === "admin",
    );

    return new Response(JSON.stringify({posts: formatPosts(posts), total}))
  } catch (error: any) {
    return new Response(error.message, {status: 500})
  }
};



