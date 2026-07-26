import React from "react";
import introPatternTop from "../images/bg-top.svg";
import introPatternBottom from "../images/bg-bottom.svg";
import { useState } from "react";
import PriceContainer from "./components/PriceContainer";

const App = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const toggleAnnual = () => {
    setIsAnnual(!isAnnual);
  };
  return (
    <div className="bg-very-light-grayish-blue  w-screen h-screen relative flex z-1 ">
      <img src={introPatternTop} alt="" className="-z-1 absolute right-0 top-0" />
      <img
        src={introPatternBottom}
        alt=""
        className="-z-1 absolute left-0 bottom-0"
      />
      <div className="inner  max-w-6xl my w-full mx-auto py-10">
        <h1 className="text-center text-2xl font-bold tracking-wider text-grayish-blue">
          Our Pricing
        </h1>
        <div className="togglediv mx-auto max-w-[250px] mt-10 flex items-center justify-between">
          <p className="leading-10 text-grayish-blue font-bold">Annually</p>
          <div
            onClick={toggleAnnual}
            className="toggle-button relative cursor-pointer bg-gradient-to-r from-[hsl(236,72%,79%)] to-[hsl(237,63%,64%)]  w-15 rounded-full h-9"
          >
            <div
              className={`toggleSwitch absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full ${
                isAnnual ? "translate-x-[4px]" : "translate-x-[28px]"
              } cursor-pointer transition-all duration-300 bg-white`}
            ></div>
          </div>
          <p className="leading-8 text-grayish-blue font-bold">Monthly</p>
        </div>
        <PriceContainer isAnnual={isAnnual} />
      </div>
    </div>
  );
};

export default App;
