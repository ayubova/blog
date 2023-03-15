import { NextApiHandler } from "next";
import { isAdmin } from "lib/utils";
import User from "models/User";
import { LatestUserProfile } from "types";

const handler: NextApiHandler = (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      return getLatestUsers(req, res);
    default:
      res.status(404).send("Not found!");
  }
};

const getLatestUsers: NextApiHandler = async (req, res) => {
  const admin = await isAdmin(req, res);
  if (!admin) return res.status(403).json({ error: "Unauthorized request" });

  const total = await User.countDocuments().exec();

  const { pageNo = "0", limit = "5" } = req.query as {
    pageNo: string;
    limit: string;
  };

  const results = await User.find({})
    .sort({ createdAt: "desc" })
    .skip(parseInt(pageNo) * parseInt(limit))
    .limit(parseInt(limit))
    .select("name email avatar provider role");

  const users: LatestUserProfile[] = results.map(
    ({ _id, name, email, avatar, provider, role }) => ({
      id: _id.toString(),
      name,
      avatar,
      provider,
      email,
      role,
    })
  );

  res.json({ users, total });
};

export default handler;
