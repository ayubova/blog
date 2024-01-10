import formidable from "formidable";
import {NextResponse, NextRequest} from "next/server";
import dbConnect from "lib/dbConnect";
import {postValidationSchema, validateSchema} from "lib/validator";
import {formatPosts, readPostsFromDb, isAuth} from "lib/utils";
import {readFile} from "lib/readFile";
import Post from "models/Post";
import cloudinary from "lib/cloudinary";
import {IncomingPost} from "types";

export const config = {
  api: {bodyParser: false},
};

export const POST = async (req:NextRequest, res:NextResponse) => {
  const {files, body} = await readFile<IncomingPost>(req);
  const user = await isAuth(req, res);

  let tags = [];

  if (body.tags) tags = JSON.parse(body.tags as string);

  const error = validateSchema(postValidationSchema, {...body, tags});
  if (error) return res.status(400).json({error});

  const {title, content, slug, meta, draft} = body;

  await dbConnect();
  const alreadyExits = await Post.findOne({slug});
  if (alreadyExits)
    return res.status(400).json({error: "Slug need to be unique"});

  const newPost = new Post({
    title,
    content,
    slug,
    meta,
    tags,
    author: user?.id,
    draft,
  });

  const thumbnail = files.thumbnail as formidable.File;
  if (thumbnail) {
    const {secure_url: url, public_id} = await cloudinary.uploader.upload(
      thumbnail.filepath,
      {
        folder: "blog",
      }
    );
    newPost.thumbnail = {url, public_id};
  }

  await newPost.save();

  res.json({post: newPost});
};

export const GET = async (req:NextRequest) => {
  try {
    const {searchParams} = new URL(req.url)
    const limit = searchParams.get("limit") || "6";
    const pageNo = searchParams.get("pageNo") || ""
    const tag = searchParams.get("tag") || ""
    const search = searchParams.get("search") || ""

    const {posts, total} = await readPostsFromDb(
      parseInt(limit),
      parseInt(pageNo),
      tag,
      search
    );

    return new Response(JSON.stringify({posts: formatPosts(posts), total}))
  } catch (error: any) {
    return new Response(error.message, {status: 500})
  }
};



