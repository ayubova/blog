import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { PostApiResponse } from "../types";

export const readPostsInfo = (): PostApiResponse => {
  const dirPath = path.join(process.cwd(), "posts");
  const dirs = fs.readdirSync(dirPath);
  const data = dirs.map((filename) => {
    const filePath = path.join(process.cwd(), "posts/" + filename);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });
    return matter(fileContent).data;
  });
  return data as PostApiResponse;
};
