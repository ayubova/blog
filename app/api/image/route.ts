import {S3, PutObjectCommand} from "@aws-sdk/client-s3";
import {NextRequest} from "next/server";
import cloudinary from "lib/cloudinary";

const s3Client = new S3({
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  endpoint: process.env.DO_SPACES_URL as string,
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.DO_SPACES_ID as string,
    secretAccessKey: process.env.DO_SPACES_SECRET as string
  }
});

export const config = {
  api: {bodyParser: false},
};

export const POST = async (req:NextRequest)=> {
  try {
    const formData = await req.formData()
    const imageFile = formData.get("image")

    const file = await formData?.get("image").arrayBuffer()

    const bucketParams = {
      Bucket: process.env.DO_SPACES_BUCKET as string,
      Key: imageFile?.name as string,
      Body: file,
      ACL:"public-read",
    };
    const data = await s3Client.send(new PutObjectCommand(bucketParams));
    console.log("Successfully uploaded object: " , data);
  
    const url = `https://${process.env.DO_SPACES_BUCKET}.nyc3.cdn.digitaloceanspaces.com/${imageFile.name}`
    return new Response(JSON.stringify({src: url}), {status: 200})
  } catch (error: any) {
    return new Response(error.message, {status: 500})
  }
}

// TODO move to digital ocean
export const GET = async () => {
  try {
    const {resources} = await cloudinary.api.resources({
      resource_type: "image",
      type: "upload",
      prefix: "blog",
    });

    const images = resources.map(({secure_url}: any) => ({
      src: secure_url,
    }));
    return new Response(JSON.stringify({images}), {status: 200})
  } catch (error: any) {
    return new Response(error.message, {status: 500})
  }
};
