import React from "react";
import { monthlyPrices, annualPrices } from "../constants/constants";

const PriceContainer = ({ isAnnual }) => {
  return (
    <div className=" mt-15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-15 md:px-0 gap-10 md:gap-0">
      {isAnnual
        ? annualPrices.map(({ id, type, price, features }) => (
            <div
              className={` ${
                id == 2 &&
                "lg:scale-110 bg-gradient-to-r from-[hsl(236,72%,79%)] to-[hsl(237,63%,64%)] text-white "
              } left   flex flex-col gap-6 shadow-2xl rounded-md p-10`}
              key={id}
            >
              <p className="text-center font-bold ">{type}</p>
              <p className="price flex items-center justify-center text-center text-2xl">
                $ <span className="amount font-bold text-5xl"> {price}</span>
              </p>
              <div className="">
                {features.map((item) => (
                  <div
                    className={`${
                      item.id == 1 ? "border-y-2" : "border-b-2"
                    } border-gray-200 py-4`}
                    key={item.id}
                  >
                    <p className="text-center">{item.name}</p>
                  </div>
                ))}
              </div>
              <button
                className={`text-center py-3  ${
                  id == 2
                    ? "text-purple-300 bg-white"
                    : "bg-gradient-to-r from-[hsl(236,72%,79%)] to-[hsl(237,63%,64%)] text-white"
                } font-bold  text-pur rounded-md cursor-pointer`}
              >
                LEARN MORE
              </button>
            </div>
          ))
        : monthlyPrices.map(({ id, type, price, features }) => (
            <div
            className={` ${
              id == 2 &&
              "lg:scale-110 bg-gradient-to-r from-[hsl(236,72%,79%)] to-[hsl(237,63%,64%)] text-white "
            } left   flex flex-col gap-6 shadow-2xl rounded-md p-10`}
            key={id}
          >
              <p className="text-center font-bold ">{type}</p>
              <p className="price flex items-center justify-center text-center text-2xl">
                $ <span className="amount font-bold text-5xl"> {price}</span>
              </p>
              <div className="">
                {features.map((item) => (
                  <div
                    className={`${
                      item.id == 1 ? "border-y-2" : "border-b-2"
                    } border-gray-200 py-4`}
                    key={item.id}
                  >
                    <p className="text-center">{item.name}</p>
                  </div>
                ))}
              </div>
              <button
                className={`text-center py-3  ${
                  id == 2
                    ? "text-purple-300 bg-white"
                    : "bg-gradient-to-r from-[hsl(236,72%,79%)] to-[hsl(237,63%,64%)] text-white"
                } font-bold  text-pur rounded-md cursor-pointer`}
              >
                LEARN MORE
              </button>
            </div>
          ))}
    </div>
  );
};

export default PriceContainer;
