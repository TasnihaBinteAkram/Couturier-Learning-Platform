import React from "react";
import { GiTeacher } from "react-icons/gi";
import { IoPeople } from "react-icons/io5";
import { AiFillDollarCircle } from "react-icons/ai";
import { useAuth } from "../../Hooks/useAuth";
import axios from "axios";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { Toast } from "../../utils/Toast";
import { useInstructor } from "../../Hooks/useInstructor";
import { useAdmin } from "../../Hooks/useAdmin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();


const SideCard = ({ course, i }) => {

  const { isAdmin } = useAdmin();
  const { isInstructor } = useInstructor();
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    _id,
    courseName,
    instructorName,
    instructorEmail,
    availableSeats,
    price,
    image,
    deatils,
    enrolled,
  } = course;
  const handleEnroll = (id) => {
    const enrolledCourse = {
      courseId: id,
      courseName,
      instructorName,
      instructorEmail,
      price,
      studentName: user?.displayName,
      studentMail: user?.email,
      availableSeats,
      enrolled: enrolled ? enrolled : 0,
      image,
    };

    if (user) {
      axiosSecure.post("/enroll", enrolledCourse).then((res) => {
        if (res.data.insertedId) {
          Toast("Enrolled! Complete Payment from dashboard.");
        }
      });
    } else {
      Toast("Please Login to enroll!");
      navigate("/login", { state: { from: location } });
    }
  };
  return (
    <div data-aos={i%2==0?"fade-left":"fade-right"} data-aos-duration="700"
      className={`card lg:card-side ${
        availableSeats == 0 ? "bg-red-100" : "bg-base-100"
      } shadow-xl overflow-hidden`}
    >
      <div className="lg:w-3/5 ">
        <img
          className="w-full h-full object-cover sm:rounded-lg lg:rounded-l-lg"
          src={image}
          alt="Movie"
        />
      </div>
      <div className="card-body">
        <h2 className="card-title">{courseName}</h2>
        <p className="text-sm lg:text-base">
          {deatils
            ? deatils
            : "Fashion designing is a creative field involving clothing and accessory design. It includes sketching, fabric selection, patternmaking, and garment construction, influencing trends with unique and aesthetically pleasing designs."}
        </p>
        <div className="lg:flex justify-between">
          <p className="font-bold">
            <GiTeacher className="inline mr-2 text-ui-pink-dark text-xl" />{" "}
            {instructorName}
          </p>
          <p className="font-bold">
            <AiFillDollarCircle className="inline mr-2 text-ui-pink-dark text-xl" />{" "}
            {price}
          </p>
          <p className="font-bold">
            <IoPeople className="inline mr-2 text-ui-pink-dark text-xl" />{" "}
            {availableSeats} seats
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-center lg:space-x-4">
          <button
            disabled={availableSeats == 0 || isAdmin || isInstructor}
            onClick={() => handleEnroll(_id)}
            className="btn-pink mt-2 w-full lg:w-1/3"
          >
            Enroll
          </button>
          <Link className="w-full" to={`/course/${courseName}/${_id}`}>
            <button className="btn-pink mt-2 w-full lg:w-1/3">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideCard;
