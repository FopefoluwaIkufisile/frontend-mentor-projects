import React, { useEffect, useState } from "react";
import logo from "../../images/logo.svg";
import { useMediaQuery } from "react-responsive";
import menu from "../../images/icon-hamburger.svg";
import close from "../../images/icon-close.svg";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  return (
    <div className="fixed w-full top-0 z-50">
      <div className="border-b border-gray-200 bg-white">
        <div className="flex justify-between items-center p-3 max-w-6xl mx-auto">
          <img src={logo} alt="logo" />
          {isMobile ? (
            <div className="flex gap-6 list-none items-center font-karla font-semibold">
              <img
                src={isOpen ? close : menu}
                alt="menu"
                onClick={handleOpen}
              />
            </div>
          ) : (
            <nav className="flex gap-6 list-none items-center font-karla font-semibold">
              <a
                href="#"
                className="text-gray-light uppercase hover:text-blue-deep transition-colors duration-300"
              >
                <li>How we work</li>
              </a>
              <a
                href="#"
                className="text-gray-light uppercase hover:text-blue-deep transition-colors duration-300"
              >
                <li>Blog</li>
              </a>
              <a
                href="#"
                className="text-gray-light uppercase hover:text-blue-deep transition-colors duration-300"
              >
                <li>Account</li>
              </a>
              <a
                href="#"
                className=" border-2 border-blue-deep uppercase px-4 py-2  text-blue-deep hover:bg-blue-deep hover:text-white transition-colors duration-300 "
              >
                <li>View plans</li>
              </a>
            </nav>
          )}
        </div>
      </div>
  
        <nav className={` absolute ${isOpen ? "top-full" : "-top-70"}  transition-all duration-300 z-40 w-full flex md:hidden flex-col gap-6 list-none items-center font-karla font-semibold bg-blue-deep py-10`}>
          <a
            href="#"
            className="text-gray-lightest uppercase hover:text-blue-deep transition-colors duration-300"
          >
            <li>How we work</li>
          </a>
          <a
            href="#"
            className="text-gray-lightest uppercase hover:text-blue-deep transition-colors duration-300"
          >
            <li>Blog</li>
          </a>
          <a
            href="#"
            className="text-gray-lightest uppercase hover:text-blue-deep transition-colors duration-300"
          >
            <li>Account</li>
          </a>
          <a
            href="#"
            className=" border-2 border-gray-lightest uppercase px-4 py-2  text-gray-lightest hover:bg-blue-deep hover:text-white transition-colors duration-300 w-9/10 text-center "
          >
            <li>View plans</li>
          </a>
        </nav>
      
    </div>
  );
};

export default Header;
