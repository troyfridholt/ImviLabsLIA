import React from "react";
import Link from "../Link/Link";
import { navItems } from "./NavItems.js";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-items">
        {navItems.map((item) => {
         return <li key={item.id} className={item.className}>
            <Link linkText={item.title} url={item.path} />
          </li>;
        })}

        <Link linkText="Personer vi hjälpt" url="$" />
        <button type="button">Testa dig gratis</button>
      </ul>
    </nav>
  );
}

export default Navbar;
