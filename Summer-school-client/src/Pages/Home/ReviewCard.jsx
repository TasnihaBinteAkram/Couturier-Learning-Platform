import React from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const ReviewCard = ({ rev }) => {
  const { name, rating, image, review, profession } = rev;
  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-72 lg:w-96 h-[450px] px-8 rounded-xl shadow-xl bg-pink-50">
      <img className="w-24 h-24 rounded-full object-cover" src={image} alt="" />
      <div className="text-center">
        <p className="text-2xl font-semibold text-slate-700">{name}</p>
        <p className="text-base  text-slate-700">{profession}</p>
      </div>
      <Rating style={{ maxWidth: 80 }} value={rating} readOnly />
      {/* <p className="text-slate-700">{review}</p> */}
      <blockquote className="text-sm lg:text-base">{review}</blockquote>
    </div>
  );
};

export default ReviewCard;
