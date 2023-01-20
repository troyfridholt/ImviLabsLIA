import React from "react";
import Link from "../Link/Link";
import { navItems } from "./NavItems.js";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import logo from "../../Images/imvi-logo.png";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav--logo-container">
        <a href="https://imvilabs.com/sv/">
          <img className="nav--logo" src={logo} alt="Logo"></img>
        </a>
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
            <div className="nav--btn-container">
              <button className="nav--btn" type="button">
                Testa dig gratis
              </button>
            </div>
          </ul>
        </div>
        <div className="nav--cart-icon"></div>

        <div className="nav--lang-icon"></div>
      </div>
    </nav>
  );
}

export default Navbar;
