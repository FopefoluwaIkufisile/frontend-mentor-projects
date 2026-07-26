import React from "react";
import { motion } from "framer-motion";

import { different } from "../constants/constants";

const Different = () => {
  return (
    <div className=" md:mt-70 my-30">
      <div className=" max-w-6xl px-4 mx-auto flex flex-col gap-10 max-md:items-center">
        <motion.div className="w-40 h-[2px] bg-gray-light " />
        <motion.h1
          className="text-4xl"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          We're different
        </motion.h1>
        <motion.div
          className=" grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {" "}
          {different.map((item) => (
            <motion.div
              className=" flex flex-col max-md:items-center gap-5"
              key={item.id}
            >
              <motion.img src={item.icon} alt="" className="w-20 h-20" />
              <motion.h2
                className="text-2xl"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {item.title}
              </motion.h2>
              <motion.p
                className="font-karla max-md:text-center  text-gray-light font-semibold"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {item.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Different;
