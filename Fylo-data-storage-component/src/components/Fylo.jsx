import React, { useEffect, useRef, useState } from "react";
import Logo from "@/assets/logo.svg";
import Document from "@/assets/icon-document.svg";
import Folder from "@/assets/icon-folder.svg";
import Upload from "@/assets/icon-upload.svg";

const Fylo = () => {
  const [range, setRange] = useState(815);

  const sliderRef = useRef(null);

  useEffect(() => {
    const percent = range / 10; // 0–100%
    const firstStop = percent * 0.5;
    const secondStop = percent;

    const bg = `linear-gradient(
      to right,
      hsl(6, 100%, 80%) 0%,
      hsl(335, 100%, 65%) ${percent}%,
        hsl(229, 57%, 11%) ${percent}%
    )`;

    if (sliderRef.current) sliderRef.current.style.background = bg;
  }, [range]);
  return (
    <div className="w-full max-w-4xl  flex flex-col sm:flex-row sm:justify-between sm:items-end gap-7">
      <div className="w-full sm:w-2/5 h-full p-8 text-white bg-card-background gap-5 flex flex-col rounded-xl rounded-tr-[80px] shadow-2xl">
        <div className="top">
          <img src={Logo} alt="" />
        </div>
        <div className="bottom flex items-center gap-3">
          <div className="p-2 bg-background rounded-md">
            <img src={Document} alt="" />
          </div>
          <div className="p-2 bg-background rounded-md">
            <img src={Folder} alt="" />
          </div>
          <div className="p-2 bg-background rounded-md">
            <img src={Upload} alt="" />
          </div>
        </div>
      </div>
      <div className="w-full sm:w-3/5 h-full  p-8 text-white bg-card-background flex flex-col gap-3 shadow-2xl rounded-xl">
        <p className="text-gray-400 sm:text-left text-center">
          You've used{" "}
          <span className="text-white">
            <span>{range}</span> GB
          </span>{" "}
          of your storage
        </p>
        <div className="relative">
          <div className="bg-background px-1 rounded-[9999px] relative h-6 flex justify-center items-center">
            <input
              className="w-full appearance-none h-6/10 outline-none rounded-[9999px]"
              type="range"
              name=""
              ref={sliderRef}
              id="slider"
              min={0}
              max={1000}
              value={range}
              onChange={(e) => setRange(e.target.value)}
            />
          </div>
          <div className="absolute -top-34 text-black p-4 rounded-2xl bg-white z-50  right-0 tool-tip">
            <p className="text-4xl flex items-center gap-4 font-bold">
              {1000 - range}
              <span className="text-sm font-normal text-gray">GB LEFT</span>
            </p>
          </div>
          <div className="relative w-full -bottom-2  flex justify-between text-sm">
            <p>0GB</p>
            <p>1000GB</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fylo;
