import React, { useState } from "react";
import Logo from "../assets/logo.svg";
import close from "../assets/icon-close.svg";
import MenuBtn from "../assets/icon-hamburger.svg";

const Navbar = ({Open, Close, isOpen}) => {
 

  return (
    <div className="flex w-full items-center justify-between px-2 py-6">
      <div
        className={`fixed top-0 ${isOpen === true ? "left-0" : "-left-[1000px]"} z-10 h-screen w-screen bg-black duration-600 sm:hidden`}
      >
        <div className="top flex w-full items-center justify-between px-8 py-15">
          <img src={Logo} alt="" />
          <img src={close} alt="" className="block sm:hidden" onClick={Close} />
        </div>
        <div className="bottom mt-20 px-8">
          <div className="flex flex-col items-start gap-6">
            <a
              href="#"
              className="group relative font-josefin text-3xl font-thin text-white"
            >
              ABOUT
              <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-center scale-x-0 bg-white duration-300 group-hover:scale-x-100"></span>
            </a>
            <a
              href="#"
              className="group relative font-josefin text-3xl font-thin text-white"
            >
              CAREERS
              <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-center scale-x-0 bg-white duration-300 group-hover:scale-x-100"></span>
            </a>
            <a
              href="#"
              className="group relative font-josefin text-3xl font-thin text-white"
            >
              EVENTS
              <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-center scale-x-0 bg-white duration-300 group-hover:scale-x-100"></span>
            </a>
            <a
              href="#"
              className="group relative font-josefin text-3xl font-thin text-white"
            >
              PRODUCTS
              <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-center scale-x-0 bg-white duration-300 group-hover:scale-x-100"></span>
            </a>
            <a
              href="#"
              className="group relative font-josefin text-3xl font-thin text-white"
            >
              SUPPORT
              <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-center scale-x-0 bg-white duration-300 group-hover:scale-x-100"></span>
            </a>
          </div>
        </div>
      </div>
      <img src={Logo} alt="" />
      <img src={MenuBtn} alt="" className="block sm:hidden" onClick={Open} />
      <div className="nav-links hidden gap-5 font-josefin text-[10px] font-semibold text-white sm:flex sm:text-[15px]">
        <a href="#" className="group relative">
          About
          <span className="absolute -bottom-2 left-0 h-0.5 w-full origin-center scale-x-0 transform bg-white transition-transform duration-300 group-hover:scale-x-100"></span>
        </a>
        <a href="#" className="group relative">
          Careers
          <span className="absolute -bottom-2 left-0 h-0.5 w-full origin-center scale-x-0 transform bg-white transition-transform duration-300 group-hover:scale-x-100"></span>
        </a>
        <a href="#" className="group relative">
          Events
          <span className="absolute -bottom-2 left-0 h-0.5 w-full origin-center scale-x-0 transform bg-white transition-transform duration-300 group-hover:scale-x-100"></span>
        </a>
        <a href="#" className="group relative">
          Products
          <span className="absolute -bottom-2 left-0 h-0.5 w-full origin-center scale-x-0 transform bg-white transition-transform duration-300 group-hover:scale-x-100"></span>
        </a>
        <a href="#" className="group relative">
          Support
          <span className="absolute -bottom-2 left-0 h-0.5 w-full origin-center scale-x-0 transform bg-white transition-transform duration-300 group-hover:scale-x-100"></span>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
