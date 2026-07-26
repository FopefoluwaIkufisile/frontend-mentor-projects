import React from "react";
import bg from "../../images/bg-pattern-how-we-work-desktop.svg";
import bgMobile from "../../images/bg-pattern-how-we-work-mobile.svg";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";

const Find = () => {
    const isMobile = useMediaQuery({query: '(max-width: 768px)'})
  return (
    <div className=" mt-40 max-md:px-10">
      <div className="bg-blue-deep max-w-6xl px-15 py-20 mx-auto flex flex-col md:flex-row items-center justify-between relative overflow-clip max-md:gap-10">
        {isMobile ? <img src={bgMobile} alt="" className="mobile absolute top-0 right-0 w-1/2" /> : <img src={bg} alt="" className="desktop absolute top-0 right-0 w-1/2" />}
        <motion.h1 className="text-white text-5xl max-md:text-center"
        initial={{opacity: 0, y: 100}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
        >Find out more <br className="max-md:hidden"/> about how we work</motion.h1>
        <a
          href="#" className="border-2 border-white px-4 py-2 text-white uppercase font-karla z-10 hover:bg-white hover:text-blue-deep transition-colors duration-300"
        >
          How we work
        </a>
      </div>
    </div>
  );
};

export default Find;
