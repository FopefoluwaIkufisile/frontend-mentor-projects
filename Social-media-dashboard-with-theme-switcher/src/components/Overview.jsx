import React from "react";
import Facebook from "/images/icon-facebook.svg";
import Twitter from "/images/icon-twitter.svg";
import Instagram from "/images/icon-instagram.svg";
import Youtube from "/images/icon-youtube.svg";
import IconUp from "/images/icon-up.svg";
import IconDown from "/images/icon-down.svg";

const overviews = [
  {
    id: 1,
    text: "Page Views",
    amount: "87",
    icon: Facebook,
    count: 3,
    progress: true,
  },
  {
    id: 2,
    text: "Likes",
    amount: "52",
    icon: Facebook,
    count: 2,
    progress: false,
  },
  {
    id: 3,
    text: "Likes",
    amount: "5462",
    icon: Instagram,
    count: 2257,
    progress: true,
  },
  {
    id: 4,
    text: "Profile Views",
    amount: "52k",
    icon: Instagram,
    count: 1375,
    progress: true,
  },
  {
    id: 5,
    text: "Retweets",
    amount: "117",
    icon: Twitter,
    count: 303,
    progress: true,
  },
  {
    id: 6,
    text: "Likes",
    amount: "507",
    icon: Twitter,
    count: 553,
    progress: true,
  },
  {
    id: 7,
    text: "Likes",
    amount: "107",
    icon: Youtube,
    count: 19,
    progress: false,
  },
  {
    id: 8,
    text: "Total Views",
    amount: "1407",
    icon: Youtube,
    count: 12,
    progress: false,
  },
];

const Overview = () => {
  return (
    <div className=" flex flex-col gap-5">
      <p className="text-black-white text-2xl font-semibold">Overview - Today</p>
      <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {overviews.map(({ id, text, amount, icon, count, progress }) => (
          <div
            key={id}
            className="bg-blue-card-bg flex flex-col justify-between p-7 gap-10 shadow-md rounded-sm hover:contrast-80 hover:cursor-pointer"
          >
            <div className="top flex justify-between items-center">
              <p className="text-blue-text font-bold">{text}</p>
              <img src={icon} className="size-7" alt="social" />
            </div>
            <div className="bottom flex justify-between items-center">
              <p className="text-black-white text-3xl font-semibold">{amount}</p>
              <div className="flex gap-2 self-end items-center">
                <img
                  src={progress ? IconUp : IconDown}
                  alt=""
                  className="size-2"
                />
                <p className={`${progress ? " text-green" : "text-red-500"} text-sm font-semibold`}>
                  {count}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
