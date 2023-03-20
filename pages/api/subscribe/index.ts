import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_KEY = process.env.MAILERLITE_PRODUCTION_API_KEY;
const BASE_URL = process.env.MAILERLITE_PRODUCTION_BASE_API_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const url = `${BASE_URL}/subscribers`;

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };
  try {
    await axios.post(
      url,
      {
        email: email,
        fields: {
          name: name,
        },
      },
      options
    );
    return res.status(201).json({ error: "" });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
