import React from "react";
import DeepEarth from "../assets/desktop/image-deep-earth.jpg";
import NightArcade from "../assets/desktop/image-night-arcade.jpg";
import SoccerTeamVr from "../assets/desktop/image-soccer-team.jpg";
import TheGrid from "../assets/desktop/image-grid.jpg";
import FromUpAboveVr from "../assets/desktop/image-from-above.jpg";
import PocketBorealis from "../assets/desktop/image-pocket-borealis.jpg";
import TheCuriosity from "../assets/desktop/image-curiosity.jpg";
import MakeItFisheye from "../assets/desktop/image-fisheye.jpg";
import { motion } from "framer-motion";

const Creations = () => {
  return (
    <div className="">
      <div className="mx-auto max-w-6xl px-6 sm:px-4">
        <div className="top flex items-center justify-center py-3 sm:justify-between">
          <p className="font-josefin text-3xl font-light tracking-tight">
            OUR CREATIONS
          </p>
          <a
            href="#"
            className="hidden border-2 border-gray-500 px-10 py-2 tracking-widest sm:block"
          >
            SEE ALL
          </a>
        </div>
        <div className="creations mt-10 mb-10 grid grid-cols-1 gap-6 sm:mb-30 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <motion.div initial={{opacity: 0, y:-50, x:-50}} whileInView={{opacity: 1, y:0, x:0}} 
          transition={{duration: 0.6}} 
          viewport={{once: true, amount: 0.1}} className="group relative h-[150px] hover:cursor-pointer sm:h-[400px]">
            <img
              src={DeepEarth}
              alt=""
              className="h-full w-full object-cover brightness-70 group-hover:opacity-40"
            />
            <p className="absolute bottom-7 left-5 font-josefin text-3xl font-thin tracking-tight text-white group-hover:font-light group-hover:text-black">
              DEEP EARTH
            </p>
          </motion.div>
          <motion.div  initial={{opacity: 0, y:-50, x:-50}} whileInView={{opacity: 1, y:0, x:0}} 
          transition={{duration: 0.6, delay: 0.3}} 
          viewport={{once: true, amount: 0.1}}  className="group relative h-[150px] hover:cursor-pointer sm:h-[400px]">
            <img
              src={NightArcade}
              alt=""
              className="h-full w-full object-cover brightness-70 group-hover:opacity-40"
            />
            <p className="absolute bottom-7 left-5 font-josefin text-3xl font-thin tracking-tight text-white group-hover:font-light group-hover:text-black">
              NIGHT ARCADE
            </p>
          </motion.div>
          <motion.div initial={{opacity: 0, y:-50, x:-50}} whileInView={{opacity: 1, y:0, x:0}} 
          transition={{duration: 0.6, delay: 0.6}} 
          viewport={{once: true, amount: 0.1}} className="group relative h-[150px] hover:cursor-pointer sm:h-[400px]">
            <img
              src={SoccerTeamVr}
              alt=""
              className="h-full w-full object-cover object-top brightness-70 group-hover:opacity-40"
            />
            <p className="absolute bottom-7 left-5 font-josefin text-3xl font-thin tracking-tight text-white group-hover:font-light group-hover:text-black">
              SOCCER TEAM VR
            </p>
          </motion.div>
          <motion.div initial={{opacity: 0, y:-50, x:-50}} whileInView={{opacity: 1, y:0, x:0}} 
          transition={{duration: 0.6, delay: 0.9}} 
          viewport={{once: true, amount: 0.1}} className="group relative h-[150px] hover:cursor-pointer sm:h-[400px]">
            <img
              src={TheGrid}
              alt=""
              className="h-full w-full object-cover brightness-70 group-hover:opacity-40"
            />
            <p className="absolute bottom-7 left-5 font-josefin text-3xl font-thin tracking-tight text-white group-hover:font-light group-hover:text-black">
              THE GRID
            </p>
          </motion.div>
          <motion.div initial={{opacity: 0, y:-50, x:-50}} whileInView={{opacity: 1, y:0, x:0}} 
          transition={{duration: 0.6, delay: 0}} 
          viewport={{once: true, amount: 0.1}} className="group relative h-[150px] hover:cursor-pointer sm:h-[400px]">
            <img
              src={FromUpAboveVr}
              alt=""
              className="h-full w-full object-cover brightness-70 group-hover:opacity-40"
            />
            <p className="absolute bottom-7 left-5 font-josefin text-3xl font-thin tracking-tight text-white group-hover:font-light group-hover:text-black">
              FROM UP ABOVE VR
            </p>
          </motion.div>
          <motion.div initial={{opacity: 0, y:-50, x:-50}} whileInView={{opacity: 1, y:0, x:0}} 
          transition={{duration: 0.6, delay: 0.3}} 
          viewport={{once: true, amount: 0.1}} className="group relative h-[150px] hover:cursor-pointer sm:h-[400px]">
            <img
              src={PocketBorealis}
              alt=""
              className="h-full w-full object-cover brightness-70 group-hover:opacity-40"
            />
            <p className="absolute bottom-7 left-5 font-josefin text-3xl font-thin tracking-tight text-white group-hover:font-light group-hover:text-black">
              POCKET BOREALIS
            </p>
          </motion.div>
          <motion.div initial={{opacity: 0, y:-50, x:-50}} whileInView={{opacity: 1, y:0, x:0}} 
          transition={{duration: 0.6, delay: 0.6}} 
          viewport={{once: true, amount: 0.1}} className="group relative h-[150px] hover:cursor-pointer sm:h-[400px]">
            <img
              src={TheCuriosity}
              alt=""
              className="h-full w-full object-cover brightness-70 group-hover:opacity-40"
            />
            <p className="absolute bottom-7 left-5 font-josefin text-3xl font-thin tracking-tight text-white group-hover:font-light group-hover:text-black">
              THE CURIOSITY
            </p>
          </motion.div>
          <motion.div initial={{opacity: 0, y:-50, x:-50}} whileInView={{opacity: 1, y:0, x:0}} 
          transition={{duration: 0.6, delay:0.9}} 
          viewport={{once: true, amount: 0.1}} className="group relative h-[150px] hover:cursor-pointer sm:h-[400px]">
            <img
              src={MakeItFisheye}
              alt=""
              className="h-full w-full object-cover brightness-70 group-hover:opacity-40"
            />
            <p className="absolute bottom-7 left-5 font-josefin text-3xl font-thin tracking-tight text-white group-hover:font-light group-hover:text-black">
              MAKE IT FISHEYE
            </p>
          </motion.div>
        </div>
        <div className="flex justify-center sm:hidden">
          <a
            href="#"
            className="mb-30 border-2 border-gray-500 px-10 py-2 tracking-widest"
          >
            SEE ALL
          </a>
        </div>
      </div>
    </div>
  );
};

export default Creations;
