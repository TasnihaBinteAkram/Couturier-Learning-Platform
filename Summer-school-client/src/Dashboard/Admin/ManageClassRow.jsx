import React from "react";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";
import { useCourses } from "../../Hooks/useCourses";
import { Toast } from "../../utils/Toast";
import { Link } from "react-router-dom";

const ManageClassRow = ({ course }) => {
  const {
    _id,
    courseName,
    instructorEmail,
    instructorName,
    price,
    availableSeats,
    status,
    image,
  } = course;
  const { refetch } = useCourses();
  const [axiosSecure] = useAxiosSecure();

  const handleButton = (status) => {
    axiosSecure.post(`/classes/${_id}`, {status: status})
    .then(res => {
      console.log(res.data);
      if (res.data.modifiedCount>0){
        refetch();
        Toast("Updated Course status")
      }
    })
  };
  
  return (
    <>
      <tr>
        <td></td>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={image} alt={courseName} />
              </div>
            </div>
            <div className="font-bold">{courseName}</div>
          </div>
        </td>
        <td>{instructorName}</td>
        <td>{instructorEmail}</td>
        <td>{availableSeats}</td>
        <td>${price}</td>
        <td className={`capitalize ${status=="approved" && "text-green-600"} ${status=="denied" && "text-red-600"} ${status=="pending" && "text-yellow-600"}`}>{status}</td>
        <td className=" space-x-1">
          <button
            onClick={() => handleButton("approved")}
            disabled={status == "approved" || status == "denied"}
            className="button-xs"
          >
            Approve
          </button>
          <button
              onClick={() => handleButton("denied")}
              disabled={status == "approved" || status == "denied"}
              className="button-xs"
            > Deny</button>
          <Link to={`/sendfeedback/${_id}`}>
            <button className="button-xs block mt-1 w-4/5">Send Feedback</button>
          </Link>
        </td>
      </tr>
    </>
  );
};

export default ManageClassRow;
