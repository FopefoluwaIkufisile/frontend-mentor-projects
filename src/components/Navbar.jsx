import React, { useState } from "react";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);

  isDark
    ? document.documentElement.classList.add("dark")
    : document.documentElement.classList.remove("dark");
  return (
    <>
      {/* desktop */}
      <div className="relative hidden md:flex justify-between items-center py-4 ">
        <div className="sticky top-10">
          <p className="font-semibold text-2xl text-black-white">
            Social Media Dashboard
          </p>
          <p className="font-semibold text-blue-text">
            Total Followers: 23,004
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <p className="text-md font-semibold text-blue-text">Dark Mode</p>
          <div
            className={`${
              isDark
                ? "bg-gradient-to-r from-[hsl(210,78%,56%)] to-[hsl(146,68%,55%)]"
                : "bg-toggle"
            } w-14 rounded-full h-7 relative cursor-pointer hover:bg-gradient-to-r from-[hsl(210,78%,56%)] to-[hsl(146,68%,55%)]    transition-all duration-300`}
            onClick={() => setIsDark(!isDark)}
          >
            <div
              className={`bg-bg absolute top-1/2 -translate-y-1/2 ${
                isDark ? "-translate-y-1/2" : "translate-x-7"
              }  size-5 left-1 rounded-full  transition-all duration-300`}
            ></div>
          </div>
        </div>
      </div>
      {/* mobile */}
      <div className=" flex md:hidden  flex-col gap-5 py-4">
        <div>
          <p className="font-semibold text-2xl text-black-white">
            Social Media Dashboard
          </p>
          <p className="font-semibold text-blue-text">
            Total Followers: 23,004
          </p>
        </div>
        <div className="h-[0.5px] bg-blue-text" />
        <div className="flex justify-between items-center">
          <p className="text-md font-semibold text-blue-text">Dark Mode</p>
          <div
            className={`${
              isDark
                ? "bg-gradient-to-r from-[hsl(210,78%,56%)] to-[hsl(146,68%,55%)]"
                : "bg-toggle"
            } w-14 rounded-full h-7 relative cursor-pointer hover:bg-gradient-to-r from-[hsl(210,78%,56%)] to-[hsl(146,68%,55%)]    transition-all duration-300`}
            onClick={() => setIsDark(!isDark)}
          >
            <div
              className={`bg-bg absolute top-1/2 -translate-y-1/2 ${
                isDark ? "-translate-y-1/2" : "translate-x-7"
              }  size-5 left-1 rounded-full  transition-all duration-300`}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
