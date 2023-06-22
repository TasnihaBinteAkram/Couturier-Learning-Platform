import React from "react";
import logo from "../assets/logo/Couturier.png";

const Footer = () => {
  return (
    <div className="relative">
      <div className="absolute translate-x-[15%] lg:translate-x-[25%] -translate-y-14  lg:w-2/3 mx-auto bg-white dark:bg-opacity-20 border-2 border-ui-pink px-4 lg:px-12 py-4 rounded-xl lg:flex justify-between items-center">
        <span className="mb-2 lg:mb-0 lg:text-lg font-semibold text-ui-pink dark:text-white">
          Subscribe to our newsletter
        </span>
        <div>
          <input
            type="email"
            placeholder="Your Email"
            className="text-xs lg:text-base px-2 py-1 lg:px-4 lg:py-2 border-2 border-rose-300 rounded-lg"
          />
          <button className="bg-ui-pink text-white lg:font-bold text-sm lg:text-base px-2 lg:px-4 py-1 lg:py-2 rounded-lg hover:shadow-lg ml-2">
            Subscribe
          </button>
        </div>
      </div>
      <footer className="space-y-4 lg:space-y-0 grid grid-cols-1 lg:grid-cols-4 p-10 bg-ui-pink dark:bg-[#5c4f55] text-white">
        <div className="h-full flex flex-col justify-center items-center lg:items-start mb-4">
          <img className="w-36" src={logo} alt="" />
        </div>
        <div>
          <span className="uppercase font-semibold text-lg block">
            Navigate
          </span>
          <div className="space-x-2 lg:space-x-0">
            <a className="link link-hover lg:block">Home</a>
            <a className="link link-hover lg:block">Classes</a>
            <a className="link link-hover lg:block">Instructors</a>
            <a className="link link-hover lg:block">Login</a>
          </div>
        </div>
        <div>
          <span className="uppercase block font-semibold text-lg">
            Contact Us
          </span>
          <a className="link link-hover block">
            Street 45, Adam Street
            <br />
            New York, USA
          </a>
          <a className="link link-hover block">+0123697715</a>
          <a className="link link-hover block">couturier@edu.mail</a>
        </div>
        <div>
          <span className="uppercase font-semibold text-lg block">Legal</span>
          <div className="space-x-2 lg:space-x-0">
            <a className="link link-hover lg:block">Terms of use</a>
            <a className="link link-hover lg:block">Privacy policy</a>
            <a className="link link-hover lg:block">Cookie policy</a>
          </div>
        </div>
      </footer>
      <div className="text-center py-6 bg-ui-pink dark:dark:bg-[#5c4f55] text-white border-t border-rose-400 dark:border-slate-600">
        <p>Copyright © 2023 - All right reserved by Couturier</p>
      </div>
    </div>
  );
};

export default Footer;
