import React from "react";
import { BsPencilSquare } from "react-icons/bs";
const ClassRow = ({course, ind}) => {
    const {_id, courseName, image,feedback,enrolled, status} = course;
  return (
    <tr>
      <td>{ind+1}</td>
      <td className="w-1/4">
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src={image}
                alt="Course Image"
              />
            </div>
          </div>
          <div>
            <div className="font-bold w-2/3">{courseName}</div>
          </div>
        </div>
      </td>
      <td>{enrolled}</td>
      <td>{feedback?feedback:"No Feedback"}</td>
      <td className={`capitalize font-semibold ${status=='pending'?"text-amber-500":status=="denied"?"text-red-600":"text-green-700"}`}>{status}</td>
      <td><BsPencilSquare className="text-xl text-ui-pink"></BsPencilSquare></td>
    </tr>
  );
};

export default ClassRow;
