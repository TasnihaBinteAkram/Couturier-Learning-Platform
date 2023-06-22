import React from "react";
import SectionTitle from "../../Shared/SectionTitle";
import { useCourses } from "../../Hooks/useCourses";
import ManageClassRow from "./ManageClassRow";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";

const ManageClasses = () => {
    const {courses} = useCourses(); 
  return (
    <div>
      <SectionTitle title={"Manage All Courses"}></SectionTitle>
      <div className="overflow-x-auto mt-12">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Course Name</th>
              <th>Instructor</th>
              <th>Email</th>
              <th>Available Seats</th>
              <th>Price</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
                courses?.map(course => (
                    <ManageClassRow
                    key={course._id}
                    course={course}
                    ></ManageClassRow>
                ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClasses;
