import React from "react";
import Facebook from "/images/icon-facebook.svg";
import Twitter from "/images/icon-twitter.svg";
import Instagram from "/images/icon-instagram.svg";
import Youtube from "/images/icon-youtube.svg";
import IconUp from "/images/icon-up.svg";
import IconDown from "/images/icon-down.svg";

const socials = [
  {
    id: 1,
    borderColor: "border-facebook",
    icon: Facebook,
    followers: "1987",
    progress: true,
    count: 12,
  },
  {
    id: 2,
    borderColor: "border-twitter",
    icon: Twitter,
    followers: "1044",
    progress: true,
    count: 99,
  },
  {
    id: 3,
    borderColor: "border-instagram",
    icon: Instagram,
    followers: "11k",
    progress: true,
    count: 1099,
  },
  {
    id: 4,
    borderColor: "border-youtube",
    icon: Youtube,
    followers: "8239",
    progress: false,
    count: 144,
  },
];

const Socials = () => {
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
      {socials.map(({ id, borderColor, icon, followers, progress, count }) => (
        <div key={id}
          className={`relative shadow-md flex flex-col gap-6 hover:contrast-80 hover:cursor-pointer items-center px-8 py-8 bg-blue-card-bg${
            id === 3
              ? " rounded-md border-instagram"
              : " rounded-md border-t-5 " + borderColor
          }`}
        >
          <div className="flex gap-2 items-center">
            <img src={icon} alt="" className="size-7" />
            <p className="text-blue-text font-semibold">@nathanf</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="font-semibold text-6xl text-black-white">
              {followers}
            </p>
            <p className="text-blue-text tracking-widest font-medium">
              FOLLOWERS
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <img src={progress ? IconUp : IconDown} alt="" className="size-2" />
            <p
              className={`font-bold text-sm ${
                progress ? " text-green" : "text-red-500"
              }`}
            >
              {count} Today
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Socials;
