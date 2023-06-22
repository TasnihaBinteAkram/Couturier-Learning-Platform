import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/swiper-bundle.min.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import SectionTitle from "../../Shared/SectionTitle";
import ReviewCard from "./ReviewCard";
import girl from '../../assets/extras/girl.png'
import { Slide } from "react-awesome-reveal";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();


const Reviews = () => {
  const [revs, setrev] = useState();
  useEffect(() => {
    fetch("https://couturier-server.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => setrev(data));
  }, []);

  function handleSlideChange(swiper) {
    if (swiper.activeIndex === swiper.slides.length - 1) {
      // Reached the last slide, go to the first slide
      swiper.slideTo(0,0,true);
    }
  }

  return (
    <div className="w-3/4 mx-auto">
      <SectionTitle title={"Testimonials"}></SectionTitle>
      <div className="flex items-center mt-16">

        <div data-aos="fade-right" className="overflow-hidden lg:w-1/2 lg:mt-8">
          <Swiper
            grabCursor={true}
            allowTouchMove={true}
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              reverseDirection:true,
            }}
            loop={true}
            modules={[Autoplay]}
            className="mySwiper"
            onSlideChange={(swiper) => handleSlideChange(swiper)}
          >
            {
                revs?.map((rev,i) => <SwiperSlide
                key={i}
                > <ReviewCard rev={rev}></ReviewCard>
                </SwiperSlide>)
            }
          </Swiper>
        </div>
        <div className="lg:w-1/2 hidden lg:block">
            <Slide direction="right" delay={100}>
              <div className="relative w-[400px] ml-auto">
                <img src={girl} alt="" />
                <p className="absolute top-1/2 w-2/3 text-center left-[5%] text-3xl text-ui-pink font-lora font-bold">Check Out what students say about us!</p>
              </div>
            </Slide>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
