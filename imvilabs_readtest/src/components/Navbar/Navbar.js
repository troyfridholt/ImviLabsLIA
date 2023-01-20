import React from "react";
import Link from "../Link/Link";
import { navItems } from "./NavItems.js";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav--logo-container">
        <img
          className="nav--logo"
          src="imvilabs_readtest/src/Images/imvi-logo.png"
          alt="Logo"
        ></img>
      </div>
      <div className="nav--items-container">
        <div className="nav--links-container">
          <ul className="nav-items">
            {navItems.map((item) => {
              return (
                <li key={item.id} className={item.className}>
                  <Link
                    className="nav--link"
                    linkText={item.title}
                    url={item.path}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="nav--cart-icon"></div>
        <div className="nav--btn-container">
          <button className="nav--btn" type="button">
            Testa dig gratis
          </button>
        </div>
        <div className="nav--lang-icon"></div>
      </div>
    </nav>
  );
}

export default Navbar;
