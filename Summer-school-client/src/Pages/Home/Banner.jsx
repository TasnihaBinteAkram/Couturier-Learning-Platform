import React from "react";
import img1 from "../../assets/banner/slider-1.jpg";
import img2 from "../../assets/banner/slider-2.jpg";
import img3 from "../../assets/banner/slider-3.jpg";
import img4 from "../../assets/banner/slider-4.jpg";
import img5 from "../../assets/banner/slider-5.jpg";
import img6 from "../../assets/banner/slider-6.jpg";
import BannerSlider from "./BannerSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/swiper-bundle.min.css'
import "swiper/css/navigation";
// import "./styles.css";
import { Navigation } from "swiper";

const Banner = () => {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        loop={true}
      >
        <SwiperSlide>
          <BannerSlider
            img={img1}
            title={"Unlock Your Creativity"}
            texts={
              "Discover the art of fashion design and unleash your creative potential. Join our courses to learn the techniques, principles, and trends that will inspire your unique designs."
            }
          ></BannerSlider>
        </SwiperSlide>
        <SwiperSlide>
          <BannerSlider
            img={img2}
            title={"Become a Fashion Maestro"}
            texts={
                "Embark on a transformative journey to become a fashion maestro. From sketching and pattern-making to garment construction and styling, our comprehensive courses will elevate your skills to new heights."
            }
          ></BannerSlider>
        </SwiperSlide>
        <SwiperSlide>
          <BannerSlider
            img={img3}
            title={"Fashion Design for All"}
            texts={
                "No matter your background or experience, our inclusive fashion design courses welcome everyone. Learn from industry professionals and ignite your passion for fashion at your own pace."
            }
          ></BannerSlider>
        </SwiperSlide>
        <SwiperSlide>
          <BannerSlider
            img={img4}
            title={"Design Your Future"}
            texts={
                "Dreaming of a career in fashion? Our expert-led courses provide the knowledge and hands-on experience you need to turn your passion into a thriving profession. Start shaping your future today."
            }
          ></BannerSlider>
        </SwiperSlide>
        <SwiperSlide>
          <BannerSlider
            img={img5}
            title={"Trends & Techniques Demystified"}
            texts={
                "Stay ahead of the fashion curve with our courses that demystify the latest trends and techniques. Explore innovative design methods and gain insights into the fashion industry's ever-evolving landscape."
            }
          ></BannerSlider>
        </SwiperSlide>
        <SwiperSlide>
          <BannerSlider
            img={img6}
            title={ "Express Your Style"}
            texts={
                "Discover your unique style and learn to express it through fashion design. Our courses empower you to create garments that reflect your personality, allowing you to make a lasting impression."
            }
          ></BannerSlider>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
