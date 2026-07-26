import React from "react";
import Navbar from "./components/Navbar";
import Socials from "./components/Socials";
import Overview from "./components/Overview";

const App = () => {
  return (
    <div className=" bg-bg w-screen min-h-screen transition-colors duration-300">
      <div className="0 w-full max-w-7xl mx-auto py-8 flex flex-col gap-10 px-7">
        <Navbar/>
        <Socials/>
        <Overview/>
      </div>
    </div>
  );
};

export default App;
