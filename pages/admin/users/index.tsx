import axios from "axios";
import {NextPage} from "next";
import {useEffect, useState} from "react";
import LatestUserTable from "components/admin/LatestUserTable";
import Pagination from "components/common/Pagination";
import AdminLayout from "components/layout/AdminLayout";
import {LatestUserProfile} from "types";

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
    axios(`/api/users?pageNo=${pageNo}&limit=${limit}`)
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
