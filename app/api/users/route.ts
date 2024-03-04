import {NextRequest} from "next/server";
import {isAdmin} from "lib/utils";
import User from "models/User";
import {LatestUserProfile} from "types";

export const GET = async (req:NextRequest) => {
  const admin = await isAdmin();
  if (!admin) return new Response("Unauthorized request", {status: 403})

  const total = await User.countDocuments().exec();

  const {searchParams} = new URL(req.url)
  const limit = searchParams.get("limit") || "6";
  const pageNo = searchParams.get("pageNo") || ""

  const results = await User.find({})
    .sort({createdAt: "desc"})
    .skip(parseInt(pageNo) * parseInt(limit))
    .limit(parseInt(limit))
    .select("name email avatar provider role");

  const users: LatestUserProfile[] = results.map(
    ({_id, name, email, avatar, provider, role}) => ({
      id: _id.toString(),
      name,
      avatar,
      provider,
      email,
      role,
    })
  );

  return new Response(JSON.stringify({users, total}))
};

