import React from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <header className="bg-[#FFA500]">
      <div className="top-strip">
        <div className="container flex items-center justify-center">
          <Link to='/'><img className="2xl:w-full md:w-[5rem]" src="/logo-stf.png" alt="logo Suoi Tien Farm" /></Link>
        </div>
      </div>

      <Navigation/>
    </header>
  );
};

export default Header;
