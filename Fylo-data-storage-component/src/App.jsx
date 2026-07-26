import React from "react";
import backgroundImage from "@/assets/bg-desktop.png";
import Fylo from "@/components/Fylo";

const App = () => {
  return (
    <div
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundColor: "var(--color-background)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "bottom",
    }}
      className="font-raleway min-h-screen bg-background flex justify-center items-center"
    >
<Fylo/>
    </div>

  );
};

export default App;
