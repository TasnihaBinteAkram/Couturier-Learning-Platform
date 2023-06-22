import React, { useEffect, useState } from "react";
import { useUsers } from "../../Hooks/useUsers";
import Loader from "../../Shared/Loader";
import SectionTitle from "../../Shared/SectionTitle";
import UserRow from "./UserRow";

const ManageUsers = () => {
  const { users, isUserLoading } = useUsers();
  return (
    <div>
      <SectionTitle title={"Manage All Users"}></SectionTitle>
      {isUserLoading && <Loader />}
      <div className="overflow-x-auto mt-12">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th>Update Role</th>
            </tr>
          </thead>
          <tbody>
            {
              users?.map(user => <UserRow
              key={user._id}
              user={user}
              ></UserRow>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
