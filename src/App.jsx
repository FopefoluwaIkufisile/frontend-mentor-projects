import React, { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Leader from "./components/Leader";
import Creations from "./components/Creations";
import Footer from "./components/Footer";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
useEffect(() => {
  const handleResize = () => {
    setIsOpen(false);
  };
  window.addEventListener("resize", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);


  return (
    <div className={`${isOpen ? "h-screen overflow-clip" : ""}`}>
      <Hero Open={open} Close={close} isOpen={isOpen} />
      <Leader />
      <Creations />
      <Footer />
    </div>
  );
};

export default App;
