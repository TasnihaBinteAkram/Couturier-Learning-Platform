import React from "react";
import { useUsers } from "../../Hooks/useUsers";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";
import { Toast } from "../../utils/Toast";

const UserRow = ({ user }) => {
    const {_id, name, email, photo, role} = user;
    const {refetch} = useUsers();
    const [axiosSecure]= useAxiosSecure();
    const handleRole = (newRole) =>{
        axiosSecure.put(`/userid/${_id}`, {role: newRole})
        .then(res => {
            if(res.data.modifiedCount > 0){
                refetch()
                Toast(`Role updated to ${newRole}`)
            }
        })
    }
  return (
    <tr>
      <td></td>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="w-14 rounded-full">
              <img src={photo}/>
            </div>
          </div>
          <div>
            <div className="font-bold">{name}</div>
          </div>
        </div>
      </td>
      <td>{email}</td>
      <td className="capitalize">{role}</td>
      <td className="space-x-1">
        <button disabled={role == "admin"} onClick={()=> handleRole("admin")} className="button-xs">Admin</button>
        <button disabled={role=="instructor"} onClick={()=> handleRole("instructor")} className="button-xs">Instructor</button>
      </td>
    </tr>
  );
};

export default UserRow;
