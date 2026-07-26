import React, { useState, useEffect } from "react";
import Tanya from "../../images/image-tanya.jpg";
import John from "../../images/image-john.jpg";
import Next from "../../images/icon-next.svg";
import Prev from "../../images/icon-prev.svg";
import { motion, AnimatePresence } from "framer-motion";

const profiles = [
  {
    id: 1,
    testimonial:
      "“ I’ve been interested in coding for a while but never taken the jump, until now. I couldn’t recommend this course enough. I’m now in the job of my dreams and so excited about the future. ”",
    name: "Tanya Sinclair",
    position: "UX Engineer",
    image: Tanya,
  },
  {
    id: 2,
    testimonial:
      "“ If you want to lay the best foundation possible I’d recommend taking this course. The depth the instructors go into is incredible. I now feel so confident about starting up as a professional developer. ” ",
    name: "John Tarkpor",
    position: "Junior Front-end Developer",
    image: John,
  },
];

const Home = () => {
  const [step, setStep] = useState(0);

  const increment = (e) => {
    e.preventDefault();
    if (step < 1) {
      setStep((prev) => prev + 1);
    }
  };
  const decrement = (e) => {
    e.preventDefault();
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  useEffect(() => {
    console.log(`re rendered component`);
  }, [step]);

  const profile = profiles[step];
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        initial={{ opacity: 0, x: step === 0 ? -100 : 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: step === 0 ? -100 : 100 }}
        transition={{ duration: 0.5 }}
        key={profile.id}
        className=" w-full max-w-5xl flex gap-10 sm:gap-0 flex-col-reverse sm:flex-row h-fit items-center"
      >
        <div className="left w-full sm:w-1/2 flex flex-col gap-8">
          <p className="max-w-xl z-10 text-xl sm:text-3xl tracking-tight font-light text-gray-700 text-center sm:text-left">
            {profile.testimonial}
          </p>
          <p className="font-bold flex flex-col text-center">
            {profile.name}
            <span className="text-gray-500 font-normal">
              {profile.position}
            </span>
          </p>
        </div>
        <div className="right -z-0  w-3/4 sm:w-1/2 relative">
          <div className="w-full h-full">
            <img
              src={profile.image}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute left-1/2 max-sm:-translate-x-1/2 sm:left-15 -bottom-5  flex justify-between bg-white rounded-full overflow-hidden shadow-2xl border-2 border-gray-400">
            <a
              href=""
              className={`px-4 py-3 flex justify-center items-center ${
                step === 0 && "pointer-events-none hover:cursor-not-allowed"
              }`}
              onClick={decrement}
            >
              <img src={Prev} alt="" />
            </a>
            <a
              href=""
              className={` px-4 py-3 flex justify-center items-center ${
                step === 1 && "pointer-events-none hover:cursor-not-allowed"
              }`}
              onClick={increment}
            >
              <img src={Next} alt="" />
            </a>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;
