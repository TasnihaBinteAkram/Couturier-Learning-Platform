import React, { useEffect, useState } from "react";
import SectionTitle from "../../Shared/SectionTitle";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/swiper-bundle.min.css'
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import Card from "../Instructors/Card";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();


const PopularInstructors = () => {
  const [teachers, setTeachers] = useState();
  useEffect(() => {
    axios
      .get("https://couturier-server.vercel.app/instructors")
      .then((res) => setTeachers(res.data));
  }, []);
  return (
    <div>
      <SectionTitle
        title={"Popular Instructors"}
        sub={
          "Our Most Popular Instructors. Who have won the heart of thousands of students"
        }
      ></SectionTitle>
      <div data-aos="fade-up-right" data-aos-duration="1000" className="overflow-hidden mt-12 w-full px-6 lg:px-4">
        <Swiper
          navigation={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            270: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            500: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            820: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination, Navigation]}
          slidesPerView={3}
          spaceBetween={30}
          loop={true}
          className="mySwiper"
        >
            {
                teachers?.slice(0,6).map(teacher => <SwiperSlide key={teacher._id}>
                    <Card teacher={teacher}></Card>
                </SwiperSlide>)
            }
        </Swiper>
      </div>
    </div>
  );
};

export default PopularInstructors;
