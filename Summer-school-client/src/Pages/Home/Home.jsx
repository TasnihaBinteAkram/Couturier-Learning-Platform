import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import PopularClass from "./PopularClass";
import PopularInstructors from "./PopularInstructors";
import Reviews from "./Reviews";
import HelmetTitle from "../../Components/extras/HelmetTitle";


const Home = () => {
  return (
    <>
      <HelmetTitle>
        Couturier | Home
      </HelmetTitle>
    <div className="dark:bg-[#47303b] pb-40">
      <Banner></Banner>
      <div className="max-w-screen-xl mx-auto">
          <PopularClass></PopularClass>
        
        <PopularInstructors></PopularInstructors>
        <Reviews></Reviews>
      </div>
    </div>
    </>
  );
};

export default Home;
