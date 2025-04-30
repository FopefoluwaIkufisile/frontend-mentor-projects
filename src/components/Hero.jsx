import React from "react";
import Navbar from "./Navbar";
import HeroBackground from "../assets/desktop/image-hero.jpg";
import {motion} from "framer-motion"

const Hero = ({ Open, Close, isOpen}) => {
  return (
    <div
      style={{
        background: `url(${HeroBackground})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-20 pt-10 pb-35">
        <Navbar Open={Open} Close={Close} isOpen = {isOpen}/>
        <div>
          <motion.div initial={{opacity: 0, x:-100}} animate={{opacity: 1, x:0}} transition={{duration: 1, delay:0.2}} className="text-case mx-4 max-w-xl border-2 border-white p-5 sm:mx-4">
            <p className="font-josefin text-3xl font-thin tracking-tight text-white md:text-7xl">
              IMMERSIVE EXPERIENCES THAT DELIVER
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
