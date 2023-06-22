import React from "react";
import { useCart } from "../../Hooks/useCart";
import SectionTitle from "../../Shared/SectionTitle";
import SelectedRow from "./SelectedRow";
import EmptyElement from "../../Components/extras/EmptyElement";

const SelectedCourses = () => {
  const { cartCourses ,isCartLoading } = useCart();
  return (
    <div className="mb-12">
      <SectionTitle
        title={"Selected Courses"}
        sub={"Complete Your payment and start your amazing journey with us"}
      ></SectionTitle>
      <div className="overflow-x-auto lg:w-2/3 mx-auto mt-12">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Course Name</th>
              <th>Instructor</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
                cartCourses?.map((course,i) => <SelectedRow
                key={course._id}
                course={course}
                index={i}
                ></SelectedRow>)
            }
            
          </tbody>
        </table>
      </div>
      {
        isCartLoading && <div className='h-screen flex items-center justify-center'><span className="loading loading-spinner loading-lg"></span></div>
      }
      {
        cartCourses?.length<1 && <EmptyElement>{"You have not selected any courses yet!"}</EmptyElement>
      }
    </div>
  );
};

export default SelectedCourses;
