import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionTitle from "../../Shared/SectionTitle";
import ClassCard from "../../Components/ClassCard";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const PopularClass = () => {
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    axios
      .get("https://couturier-server.vercel.app/topclasses")
      .then((res) => setClasses(res.data));
  }, []);
//   console.log(classes);
  return (
    <div data-aos="fade-up" className="overflow-hidden">
      <div className="px-4 lg:px-0 overflow-hidden">
        <SectionTitle
          title={"Our Popular Courses"}
          sub={"Choose from out best courses and start off your career with us."}
        ></SectionTitle>
        <div className="mt-20 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {classes?.map((cls, i) => (
            <ClassCard key={cls._id} course={cls}></ClassCard>
          ))}
        </div>
      </div>
      </div>
  );
};

export default PopularClass;
