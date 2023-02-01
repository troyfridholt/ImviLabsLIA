import React from "react";
import Link from "../Link/Link";
import { navItems } from "./NavItems.js";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import logo from "../../Images/imvi-logo.png";
import flagIcon from "../../Images/sweden.png";
import cartIcon from "../../Images/shopping-cart.png";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav--logo-container">
        <a href="https://imvilabs.com/sv/">
          <img className="nav--logo" src={logo} alt="Logo" />
        </a>
      </div>
      <div className="nav--items-container">
      
        <div className="nav--links-container">

          <ul className="nav-items">
          <li className="nav-item">
          <DropdownMenu />
          </li>
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
            <div className="nav--cartIcon-container">
              <a href="https://imvilabs.com/sv/varukorg/">
                <img className="nav--cartIcon" src={cartIcon} alt="Cart" />
              </a>
            </div>
            <div className="nav--btn-container">
              <button className="nav--btn" type="button">
                Testa dig gratis
              </button>
            </div>
            <div className="nav--langIcon-container">
              <img className="nav--flagIcon" src={flagIcon} alt="Flag" />
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
