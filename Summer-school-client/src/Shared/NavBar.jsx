import React, { useEffect, useState } from "react";
import NavItem from "./NavItem";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useAuth } from "../Hooks/useAuth";
import { Link } from "react-router-dom";
import { useAdmin } from "../Hooks/useAdmin";
import { useInstructor } from "../Hooks/useInstructor";
import { AiOutlineUser } from "react-icons/ai";
import { useSpring, animated } from "@react-spring/web";
import { BsSun, BsMoon } from "react-icons/bs";
import logo from '../assets/logo/Couturier.png';

const NavBar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const { isAdmin } = useAdmin();
  const { isInstructor } = useInstructor();
  const fadeAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => {});
  };
  const navlinks = (
    <>
      <NavItem item={"Home"} to={"/"} />
      <NavItem item={"Instructors"} to={"/instructors"} />
      <NavItem item={"Courses"} to={"/classes"} />
      {user ? (
        <>
          <NavItem
            item={"Dashboard"}
            to={`/dashboard/${
              isAdmin
                ? "manageclasses"
                : isInstructor
                ? "addclass"
                : "selectedcourses"
            }`}
          />
          <Link
            onClick={handleLogOut}
            className="hover:underline transition-all duration-100"
          >
            Log Out
          </Link>
          <li title={user?.displayName?user?.displayName:"User Profile"} className="list-none w-10 h-10 bg-white rounded-full flex justify-center items-center">
            {user?<img className="w-full h-full object-cover rounded-full" src={user?.photoURL}/>:<AiOutlineUser className="text-ui-pink w-6 h-6"></AiOutlineUser>}
          </li>
        </>
      ) : (
        <NavItem item={"Login"} to={"/login"} />
      )}
    </>
  );

  const [check, setCheck] = useState(true);
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    if (theme == "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  const handleTheme = () => {
    setCheck(!check);
    setTheme(theme == "light" ? "dark" : "light");
  };

  return (
    <animated.div style={fadeAnimation} className="relative h-16 bg-rose-50">
      <div className="flex justify-between items-center px-6 lg:px-20 py-2 bg-ui-pink dark:bg-dark-mode bg-opacity-95 w-11/12 mx-auto rounded-3xl absolute z-10 top-6 translate-x-[5%]">

          <Link to={'/'}><img className="w-20" src={logo} alt="" /></Link>
        <div className="space-x-6 hidden font-medium text-white lg:flex gap-4 items-center">
          {navlinks}
          <button className="text-white text-xl" onClick={handleTheme}>
            {check ? <BsSun /> : <BsMoon />}
          </button>
        </div>
        <div
          className="lg:hidden text-2xl text-white flex gap-2"
        >
          <button className="text-white text-xl" onClick={handleTheme}>
            {check ? <BsSun /> : <BsMoon />}
          </button>
          <span onClick={() => setOpen(!isOpen)}>{isOpen ? <HiX></HiX> : <HiMenuAlt3></HiMenuAlt3>}</span>
        </div>
      </div>
      <div
        className={`flex flex-col lg:hidden gap-2 bg-rose-50 rounded-lg transform duration-500 absolute z-10 h-screen px-4 py-4 w-5/12 top-[80px] right-0 ${
          isOpen ? "-translate-x-1" : "translate-x-[500px]"
        }`}
      >
        {navlinks}
      </div>
    </animated.div>
  );
};

export default NavBar;
