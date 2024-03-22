"use client"
import {NextPage} from "next";
import {useEffect, useState} from "react";
import LatestUserTable from "../components/LatestUserTable";
import Pagination from "components/common/Pagination";
import AdminLayout from "app/layout/AdminLayout";
import {LatestUserProfile} from "types";
import {getUsers} from "api";

const limit = 9;

const Users: NextPage = () => {
  const [users, setUsers] = useState<LatestUserProfile[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
    fetchAllUsers(event.selected);
  };

  const fetchAllUsers = (pageNo = currentPage) => {
    getUsers(pageNo, limit)
      .then(({data}) => {
        setUsers(data.users);
        setTotal(data.total);
      })
      .catch((err) => console.log(err));
  };

  useEffect(fetchAllUsers, [currentPage]);

  return (
    <AdminLayout>
      <h1 className="text-2xl dark:text-primary text-primary-dark font-semibold py-2 transition">
        Users
      </h1>
      <div className="h-4/6">
        <LatestUserTable users={users} />
      </div>
      <div className="flex justify-end">
        <Pagination
          total={total}
          itemsPerPage={limit}
          handlePageClick={handlePageClick}
        />
      </div>
    </AdminLayout>
  );
};

export default Users;
