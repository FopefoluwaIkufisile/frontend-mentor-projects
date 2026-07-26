import React from "react";
import heroImage from "../../images/image-intro-desktop.jpg";
import introPatternLeft from "../../images/bg-pattern-intro-left-desktop.svg";
import introPatternLeftMobile from "../../images/bg-pattern-intro-left-mobile.svg";
import introPatternRight from "../../images/bg-pattern-intro-right-desktop.svg";
import introPatternRightMobile from "../../images/bg-pattern-intro-right-mobile.svg";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";

const Hero = () => {
    const isMobile = useMediaQuery({query: '(max-width: 768px)'})
  return (
    <div className={`bg-blue-deep text-gray-lightest md:max-h-130 relative`}>
      {isMobile ? <img src={introPatternLeftMobile} alt="" className="mobile absolute left-0 -bottom-100" /> : <img src={introPatternLeft} alt="" className="desktop absolute left-0 -bottom-100" />}
      {isMobile ? <img src={introPatternRightMobile} alt="" className="mobile absolute right-0 -top-40" /> : <img src={introPatternRight} alt="" className="desktop absolute right-0 -top-40" />}
      <div className="max-w-6xl mx-auto  md:pt-35 md:pb-24  border-red-500 flex md:px-3 max-h-full gap-10 max-md:flex-col-reverse">
        <motion.div className="left flex flex-col max-md:items-center gap-5 md:w-1/2 max-md:p-10"
        initial={{opacity: 0, x: -100}}
        animate={{opacity: 1, x: 0}}
        transition={{duration: 0.5}}
        >
          <div className="max-md:hidden line h-[2px] bg-gray-lightest w-40 mb-10" />
          <h1 className="text-6xl max-md:text-center">Humanizing your insurance.</h1>
          <p className="text-gray-400 font-karla max-md:text-center">
            Get your life insurance coverage easier and faster. We blend our
            expertise and technology to help you find the plan that’s right for
            you. Ensure you and your loved ones are protected.
          </p>
          <a href="#" className="border-2  border-gray-lightest uppercase px-3 py-2 w-40 text-center font-karla hover:bg-gray-lightest hover:text-blue-deep transition-all duration-300">
           View plans
          </a>
        </motion.div>
        <motion.div className="right relative md:w-1/2"
        initial={{opacity: 0, x: 100}}
        animate={{opacity: 1, x: 0}}
        transition={{duration: 0.5, delay: 0.5}}
        >
            <img src={heroImage} className="md:absolute top-0 w-full h-full d:w-9/10  md:h-140 object-center" alt="hero" />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
