import axios from "axios";
import React from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { Toast } from "../../utils/Toast";
import { useCart } from "../../Hooks/useCart";

const SelectedRow = ({course, index}) => {
    const {_id,courseId, courseName, instructorName, price}=course;
    const {refetch} = useCart();
    const handleDelete = (id) => {
      axios.delete(`https://couturier-server.vercel.app/enrolled/${id}`)
      .then(res => {
        if(res.data.deletedCount >0){
            Toast("Removed from selected course!");
            refetch()
        }
      })
    }
  return (
    <tr>
      <td>{index+1}</td>
      <td>{courseName}</td>
      <td>{instructorName}</td>
      <td>${price}</td>
      <td className="flex items-center gap-2">
        <Link to={`/dashboard/payment/${_id}`}><button className="btn-pink">Pay</button></Link>
        <button onClick={()=>handleDelete(_id)} className="btn-pink"><HiOutlineTrash className="text-xl"/></button>
      </td>
    </tr>
  );
};

export default SelectedRow;
