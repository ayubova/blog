import { NextApiHandler } from "next";
import { readPostsInfo } from "@/lib/helper";

const handler: NextApiHandler = (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET": {
      const data = readPostsInfo();
      return res.json({ ok: true, postInfo: data });
    }
  }
};

export default handler;
