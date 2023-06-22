import React, { useEffect, useState } from "react";
import SectionTitle from "../../Shared/SectionTitle";
import axios from "axios";
import ClassRow from "./ClassRow";
import { useAuth } from "../../Hooks/useAuth";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";
import EmptyElement from "../../Components/extras/EmptyElement";

const AddedClasses = () => {
    const [courses, setCourses] = useState([]);
    const [axiosSecure] = useAxiosSecure();
    const {user} = useAuth()
    useEffect(()=>{
        axiosSecure.get(`https://couturier-server.vercel.app/classbyemail/${user?.email}`)
        .then(res => setCourses(res.data))
    },[])
  return (
    <div>
      <SectionTitle
        title={"My Courses"}
        sub={"A summery of All your added courses."}
      ></SectionTitle>
      <div className="mt-12">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                </th>
                <th>Class Name</th>
                <th>Enrolled</th>
                <th>Feedback</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* rows*/}
              {
                courses?.length>0 && courses?.map((course,i) => <ClassRow
                key={course._id}
                course={course}
                ind={i}
                ></ClassRow>)
              }
            </tbody>
          </table>
        </div>
        {
          courses?.length<1 && <EmptyElement>You have not added any course yet!</EmptyElement>
        }
      </div>
    </div>
  );
};

export default AddedClasses;
