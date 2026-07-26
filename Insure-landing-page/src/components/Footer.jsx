import React from "react";
import logo from "../../images/logo.svg";
import bg from "../../images/bg-pattern-footer-desktop.svg";
import bg2 from "../../images/bg-pattern-footer-mobile.svg";
import { links } from "../constants/constants";
import { footerLinks } from "../constants/constants";
import { useMediaQuery } from "react-responsive";




const Footer = () => {
    const isMobile = useMediaQuery({query: '(max-width: 768px)'})
  return (
    <div className=" mt-30 bg-stone-100 px-4 relative py-13">
        {isMobile ? <img src={bg2} alt="" className=" mobile absolute top-0 left-0 " /> : <img src={bg} alt="" className="desktop absolute top-0 left-0 " />}
      
      <div className=" z-10 mx-auto max-w-6xl flex flex-col gap-10 ">
        <div className="top flex flex-col md:flex-row max-md:gap-10 items-center justify-between z-10">
          <img src={logo} alt="" />
          <div className="links flex gap-4 items-center">
            {links.map((link) => (
              <a href={link.url} key={link.id}>
                {link.svg}
              </a>
            ))}
          </div>
        </div>
        <div className="max-md:w-9/10 max-md:mx-auto h-[2px] bg-gray-light z-10 " />
        <div className="bottom grid grid-cols-4 z-10 max-md:grid-cols-1 max-md:gap-10">
          {footerLinks.map((link) => (
            <div
              className="flex flex-col max-md:items-center gap-4 font-karla font-semibold uppercase z-10 "
              key={link.id}
            >
              <h2 className="text-gray-light">{link.title}</h2>
              <div className="flex flex-col max-md:items-center gap-2 font-semibold">
                {link.links.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    className="hover:underline transition-all duration-300"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
