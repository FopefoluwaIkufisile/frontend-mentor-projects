import React from "react";
import DeepEarth from "../assets/desktop/image-deep-earth.jpg";
import NightArcade from "../assets/desktop/image-night-arcade.jpg";
import SoccerTeamVr from "../assets/desktop/image-soccer-team.jpg";
import TheGrid from "../assets/desktop/image-grid.jpg";
import FromUpAboveVr from "../assets/desktop/image-from-above.jpg";
import PocketBorealis from "../assets/desktop/image-pocket-borealis.jpg";
import TheCuriosity from "../assets/desktop/image-curiosity.jpg";
import MakeItFisheye from "../assets/desktop/image-fisheye.jpg";

const Creations = () => {
  return (
    <div className="border-2 border-green-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="top flex justify-center sm:justify-between py-3 items-center ">
          <p className="text-3xl font-josefin tracking-tight font-light">
            OUR CREATIONS
          </p>
          <a
            href="#"
            className="border-2 border-gray-500 px-10 py-2 tracking-widest hidden sm:block"
          >
            SEE ALL
          </a>
        </div>
        <div className="mt-10 mb-10 sm:mb-30 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 creations grid  gap-6">
          <div className="group relative h-[150px] sm:h-[400px] hover:cursor-pointer">
            <img
              src={DeepEarth}
              alt=""
              className="w-full h-full object-cover brightness-70 group-hover:opacity-40"
            />
            <p className="absolute bottom-7 left-5 text-white text-3xl font-josefin font-thin tracking-tight group-hover:text-black group-hover:font-light ">
              DEEP EARTH
            </p>
          </div>
          <div className=" group relative  h-[150px] sm:h-[400px] hover:cursor-pointer">
            <img
              src={NightArcade}
              alt=""
              className="w-full h-full object-cover brightness-70 group-hover:opacity-40"
            />
            <p className="absolute bottom-7 left-5 text-white text-3xl font-josefin font-thin tracking-tight group-hover:text-black group-hover:font-light">
              NIGHT ARCADE
            </p>
          </div>
          <div className="group relative  h-[150px] sm:h-[400px] hover:cursor-pointer">
            <img
              src={SoccerTeamVr}
              alt=""
              className="w-full h-full object-cover brightness-70 object-top group-hover:opacity-40"
            />
            <p className="absolute bottom-7 left-5 text-white text-3xl font-josefin font-thin tracking-tight group-hover:text-black group-hover:font-light">
              SOCCER TEAM VR
            </p>
          </div>
          <div className="group relative  h-[150px] sm:h-[400px] hover:cursor-pointer">
            <img
              src={TheGrid}
              alt=""
              className="w-full h-full object-cover brightness-70 group-hover:opacity-40"
            />
            <p className="absolute bottom-7 left-5 text-white text-3xl font-josefin font-thin tracking-tight group-hover:text-black group-hover:font-light">
              THE GRID
            </p>
          </div>
          <div className="group relative h-[150px] sm:h-[400px] hover:cursor-pointer">
            <img
              src={FromUpAboveVr}
              alt=""
              className="w-full h-full object-cover brightness-70 group-hover:opacity-40"
            />
            <p className="absolute bottom-7 left-5 text-white text-3xl font-josefin font-thin tracking-tight group-hover:text-black group-hover:font-light">
              FROM UP ABOVE VR
            </p>
          </div>
          <div className="group relative  h-[150px] sm:h-[400px] hover:cursor-pointer">
            <img
              src={PocketBorealis}
              alt=""
              className="w-full h-full object-cover brightness-70 group-hover:opacity-40"
            />
            <p className="absolute bottom-7 left-5 text-white text-3xl font-josefin font-thin tracking-tight group-hover:text-black group-hover:font-light">
              POCKET BOREALIS
            </p>
          </div>
          <div className="group relative  h-[150px] sm:h-[400px] hover:cursor-pointer">
            <img
              src={TheCuriosity}
              alt=""
              className="w-full h-full object-cover brightness-70 group-hover:opacity-40"
            />
            <p className="absolute bottom-7 left-5 text-white text-3xl font-josefin font-thin tracking-tight group-hover:text-black group-hover:font-light">
              THE CURIOSITY
            </p>
          </div>
          <div className="group relative  h-[150px] sm:h-[400px] hover:cursor-pointer">
            <img
              src={MakeItFisheye}
              alt=""
              className="w-full h-full object-cover brightness-70 group-hover:opacity-40"
            />
            <p className="absolute bottom-7 left-5 text-white text-3xl font-josefin font-thin tracking-tight group-hover:text-black group-hover:font-light">
              MAKE IT FISHEYE
            </p>
          </div>
          
        </div>
        <div className="flex justify-center sm:hidden">
        <a
            href="#"
            className="border-2 border-gray-500 px-10 py-2 tracking-widest mb-30"
          >
            SEE ALL
          </a>
        </div>
  
      </div>
    </div>
  );
};

export default Creations;
