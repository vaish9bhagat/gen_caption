import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-12 w-full flex flex-row items-start justify-center gap-6 text-2xl text-white">
      <NavLink
        className={(e) => (e.isActive ? "border-b-4 border-green-500" : "")}
        to="/profile"
      >
        Profile{" "}
      </NavLink>
      <NavLink
        className={(e) => (e.isActive ? "border-b-4 border-green-500" : "")}
        to="/home"
      >
        Home
      </NavLink>
      <NavLink
        className={(e) => (e.isActive ? "border-b-4 border-green-500" : "")}
        to="/createpost"
      >
        Create Post
      </NavLink>
    </div>
  );
};

export default Navbar;
