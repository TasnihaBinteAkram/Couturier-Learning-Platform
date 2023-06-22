import React from "react";
import { NavLink } from "react-router-dom";

const DashLink = ({item, to}) => {
  return (
    <NavLink
      className={({ isActive }) =>
       ( isActive
          ? "underline px-2 text-white text-lg font-semibold"
          : "text-white font-semibold text-lg px-2 hover:text-ui-pink-dark")
      }
      to={to}
    >
      {item}
    </NavLink>
  );
};

export default DashLink;
