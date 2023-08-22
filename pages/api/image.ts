import fs from "fs";
import {NextApiHandler} from "next";
import formidable from "formidable";
import {S3, PutObjectCommand} from "@aws-sdk/client-s3";
import cloudinary from "lib/cloudinary";
import {readFile} from "lib/readFile";

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

const handler: NextApiHandler = (req, res) => {
  const {method} = req;

  switch (method) {
  case "POST":
    return uploadToDO(req, res);
  case "GET":
    return readAllImages(req, res);
  default:
    return res.status(404).send("Not found");
  }
};
// const uploadNewImage: NextApiHandler = async (req, res) => {
//   try {
//     const {files} = await readFile(req);
//     const imageFile = files.image as formidable.File;
//     console.log("files", files)
//     const {secure_url: url} = await cloudinary.uploader.upload(imageFile.filepath, {
//       folder: "blog",
//     });
//     console.log("secure_url", url)
//     res.json({src: url});
//   } catch (error: any) {
//     res.status(500).json({error: error.message});
//   }
// };

const uploadToDO : NextApiHandler = async (req, res)=> {
  try {
    const {files} = await readFile(req);
    const imageFile = files.image as formidable.File;
    console.log("files", files)
    const bucketParams = {
      Bucket: process.env.DO_SPACES_BUCKET as string,
      Key: imageFile.originalFilename as string,
      Body: fs.createReadStream(imageFile.filepath),
      ACL:"public-read",
    };
    const data = await s3Client.send(new PutObjectCommand(bucketParams));
    console.log("Successfully uploaded object: " , data);
  
    const url = `https://${process.env.DO_SPACES_BUCKET}.nyc3.cdn.digitaloceanspaces.com/${imageFile.originalFilename}`

    res.json({src: url});
  } catch (error: any) {
    res.status(500).json({error: error.message});
  }
}

const readAllImages: NextApiHandler = async (req, res) => {
  try {
    const {resources} = await cloudinary.api.resources({
      resource_type: "image",
      type: "upload",
      prefix: "blog",
    });

    const images = resources.map(({secure_url}: any) => ({
      src: secure_url,
    }));
    res.json({images});
  } catch (error: any) {
    res.status(500).json({error: error.message});
  }
};
export default handler;
