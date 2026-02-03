import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-12 w-full md:w-1/3 flex flex-row items-center justify-around  text-3xl text-white">
      <NavLink
        className={(e) => (e.isActive ? "border-b-4 border-green-500" : "")}
        to="/profile"
      >
        <i class="ri-account-circle-fill"></i>
      </NavLink>
      <NavLink
        className={(e) => (e.isActive ? "border-b-4 border-green-500" : "")}
        to="/home"
      >
        <i class="ri-home-7-fill"></i>
      </NavLink>
      <NavLink
        className={(e) => (e.isActive ? "border-b-4 border-green-500" : "")}
        to="/createpost"
      >
       <i class="ri-upload-cloud-fill"></i>
      </NavLink>
    </div>
  );
};

export default Navbar;
