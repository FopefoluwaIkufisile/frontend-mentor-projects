import React from "react";
import ImageInteractive from "../assets/desktop/image-interactive.jpg";

const Leader = () => {
  return (
    <div className="">
      <div
      
        className="relative mx-auto mt-20 max-w-6xl p-6 sm:mt-30 sm:mb-0 sm:h-[600px] sm:p-0 sm:px-4"
      >
        <div
        
          className="w-ful relative sm:absolute sm:top-0 sm:left-0 sm:-z-10 sm:h-3/4 sm:w-3/5"
        >
          <img
            src={ImageInteractive}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative w-full bg-white sm:absolute sm:right-0 sm:bottom-0 sm:h-3/4 sm:w-3/4 leader:w-2/4">
          <div className="text-inner flex h-full w-full flex-col gap-6 p-15 font-josefin">
            <p className="text-center font-josefin text-3xl font-light tracking-tight sm:text-left sm:text-5xl">
              THE LEADER IN INTERACTIVE VR
            </p>
            <p className="text-center text-gray-500 sm:text-left">
              Founded in 2011, Loopstudios has been producing world-class
              virtual reality projects for some of the best companies around the
              globe. Our award-winning creations have transformed businesses
              through digital experiences that bind to their brand.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leader;
