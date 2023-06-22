import React, { useEffect, useState } from "react";
import SectionTitle from "../../Shared/SectionTitle";
import { useAuth } from "../../Hooks/useAuth";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";
import moment from "moment/moment";
import EmptyElement from "../../Components/extras/EmptyElement";
const PaymentHistory = () => {
  const { user } = useAuth();
  const [enrolled, setEnrolled] = useState([]);
  const [axiosSecure] = useAxiosSecure();
  useEffect(() => {
    axiosSecure
      .get(`https://couturier-server.vercel.app/payments/${user?.email}`)
      .then((res) => setEnrolled(res.data));
  }, []);
  return (
    <div>
      <SectionTitle title={"Check your purchase History"}></SectionTitle>
      {enrolled?.length > 0 && (
        <div className="overflow-x-auto lg:w-2/3 mx-auto mt-12">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Course</th>
                <th>Instructor</th>
                <th>Price</th>
                <th>Enrolled On</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {enrolled?.map((course, i) => (
                <tr key={course._id}>
                  <td>{i + 1}</td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={course.image} alt={course.courseName} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{course.courseName}</div>
                      </div>
                    </div>
                  </td>
                  <td>{course.instructorName}</td>
                  <td>${course.price}</td>
                  <td>{moment(course.date).format("YYYY-MM-DD")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {
        enrolled?.length<1 && <EmptyElement>You have not enrolled to any course yet!</EmptyElement>
      }
    </div>
  );
};

export default PaymentHistory;
