import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({item, to}) => {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? "font-semibold underline" : "hover:underline transition-all duration-100"
      }
      to={to}
    >
      {item}
    </NavLink>
  );
};

export default NavItem;
