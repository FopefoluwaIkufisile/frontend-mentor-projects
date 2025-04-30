import React from "react";
import Logo from "../assets/logo.svg";
import MenuBtn from "../assets/icon-hamburger.svg";

const Navbar = () => {
  return (
    <div className=" py-6 px-2 w-full flex justify-between items-center">
      <img src={Logo} alt="" />
      <img src={MenuBtn} alt="" className="sm:hidden block" />
      <div className="nav-links hidden sm:flex text-[10px] sm:text-[15px]  gap-5 text-white font-semibold font-josefin ">
        <a href="#" className="relative group">
          About
          <span class="absolute left-0 -bottom-2 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center transform"></span>
        </a>
        <a href="#" className="relative group">
          Careers
          <span className="absolute left-0 -bottom-2 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center transform"></span>
        </a>
        <a href="#" className="relative group">
          Events
          <span className="absolute left-0 -bottom-2 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center transform"></span>
        </a>
        <a href="#" className="relative group">
          Products
          <span className="absolute left-0 -bottom-2 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center transform"></span>
        </a>
        <a href="#" className="relative group">
          Support
          <span className="absolute left-0 -bottom-2 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center transform"></span>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
