"use client"
import {NextPage} from "next";
import {useState, useEffect} from "react";
import LatestUserTable from "./components/LatestUserTable";
import ContentWrapper from "./components/ContentWrapper";
import LatestCommentListCard from "./components/LatestCommentListCard";
import LatestPostListCard from "./components/LatestPostListCard";
import AdminLayout from "app/layout/AdminLayout";

import {PostDetail, LatestComment, LatestUserProfile} from "types";

import {getUsers, getLatestComments, getPosts} from "api"

const Admin: NextPage = () => {
  const [latestPosts, setLatestPosts] = useState<PostDetail[]>([]);
  const [latestComments, setLatestComments] = useState<LatestComment[]>();
  const [latestUsers, setLatestUsers] = useState<LatestUserProfile[]>();

  useEffect(() => {
    getPosts("limit=5&skip=0")
      .then((data) => { 
        setLatestPosts(data.posts);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    getLatestComments()
      .then(({data}) => setLatestComments(data.comments))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    getUsers()
      .then(({data}) => setLatestUsers(data.users))
      .catch((err) => console.error(err));
  }, []);

  return (
    <AdminLayout>
      <div className="flex space-x-10">
        <ContentWrapper seeAllRoute="/admin/posts" title="Latest Posts">
          {latestPosts?.map(({id, title, meta, slug}) => {
            return (
              <LatestPostListCard
                key={id}
                title={title}
                meta={meta}
                slug={slug}
              />
            );
          })}
        </ContentWrapper>

        <ContentWrapper seeAllRoute="/admin/comments" title="Latest Comments">
          {latestComments?.map((comment) => {
            return <LatestCommentListCard comment={comment} key={comment.id} />;
          })}
        </ContentWrapper>
      </div>

      <div className="max-w-[500px]">
        <ContentWrapper title="Latest Users" seeAllRoute="/admin/users">
          <LatestUserTable users={latestUsers} />
        </ContentWrapper>
      </div>
    </AdminLayout>
  );
};

export default Admin;
