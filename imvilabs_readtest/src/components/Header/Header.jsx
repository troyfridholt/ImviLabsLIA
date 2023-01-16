import React from "react";
import "./Header.css";

function Header() {
  return (
    <Header className="header">
      <img
        className="header--img"
        src="./Images/imvi-logo.png"
        alt="Logo"
      ></img>
      <ul>
        <li>Link 1</li>
        <li>Link 2</li>
        <li>Link 3</li>
        <li>Link 4</li>
      </ul>
    </Header>
  );
}

export default Header;
