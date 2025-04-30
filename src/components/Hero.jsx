import React from "react";
import Navbar from "./Navbar";
import HeroBackground from "../assets/desktop/image-hero.jpg";

const Hero = () => {
  return (
    <div
      className={``}
      style={{
        background: `url(${HeroBackground})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"

      }}
    >
      <div className=" pb-35 pt-10 max-w-6xl mx-auto flex flex-col gap-20">
        <Navbar />
        <div>
          <div className="mx-4 sm:m-0 border-2 border-white text-case max-w-xl p-5">
            <p className="tracking-tight text-white text-3xl md:text-7xl font-thin font-josefin ">
              IMMERSIVE EXPERIENCES THAT DELIVER
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
