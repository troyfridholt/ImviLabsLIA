import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <img
        className="header--img"
        src="../../Images/imvi-logo.png"
        alt="Logo"
      ></img>
      <Navbar />
    </header>
  );
}

export default Header;
