import { NextPage } from "next";
import axios from "axios";
import { useState, useEffect } from "react";
import AdminLayout from "components/layout/AdminLayout";
import ContentWrapper from "components/admin/ContentWrapper";
import LatestPostListCard from "components/admin/LatestPostListCard";
import LatestCommentListCard from "components/admin/LatestCommentListCard";
import LatestUserTable from "components/admin/LatestUserTable";

import { PostDetail, LatestComment, LatestUserProfile } from "types";

interface Props {}

const Admin: NextPage<Props> = () => {
  const [latestPosts, setLatestPosts] = useState<PostDetail[]>([]);
  const [latestComments, setLatestComments] = useState<LatestComment[]>();
  const [latestUsers, setLatestUsers] = useState<LatestUserProfile[]>();

  useEffect(() => {
    axios(`/api/posts?limit=5&skip=0`)
      .then(({ data }) => {
        setLatestPosts(data.posts);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios(`/api/comment/latest`)
      .then(({ data }) => setLatestComments(data.comments))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios(`/api/users`)
      .then(({ data }) => setLatestUsers(data.users))
      .catch((err) => console.error(err));
  }, []);

  return (
    <AdminLayout>
      <div className="flex space-x-10">
        <ContentWrapper seeAllRoute="/admin/posts" title="Latest Posts">
          {latestPosts?.map(({ id, title, meta, slug }) => {
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
