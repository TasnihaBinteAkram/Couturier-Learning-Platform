import React, { useEffect, useState } from "react";
import SectionTitle from "../../Shared/SectionTitle";
import axios from "axios";
import Card from "./Card";
import { Fade } from "react-awesome-reveal";
import HelmetTitle from "../../Components/extras/HelmetTitle";

const Instructors = () => {
  const [teachers, setTeachers] = useState();
  useEffect(() => {
    axios
      .get("https://couturier-server.vercel.app/instructors")
      .then((res) => setTeachers(res.data));
  }, []);
  return (
    <div className="max-w-screen-xl mx-auto mb-36">
      <HelmetTitle>Couturier | Instructors</HelmetTitle>
      <SectionTitle
        title={"Meet Our Heroes"}
        sub={"The ultimate career shapers of our students"}
      ></SectionTitle>
      <Fade cascade damping={0.1}>
        <div className="mt-12 px-6 lg:px-0 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {teachers?.map((teacher) => (
            <Card key={teacher._id} teacher={teacher}></Card>
          ))}
        </div>
      </Fade>
    </div>
  );
};

export default Instructors;
