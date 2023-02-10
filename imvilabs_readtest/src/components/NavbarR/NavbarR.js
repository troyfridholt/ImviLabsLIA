import { FaBars, FaTimes } from "react-icons/fa";
import React from "react";
import Link from "../Link/Link";
import { useRef } from "react";
import "./NavbarR.css";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

function NavbarR() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <img></img>
      <nav ref={navRef}>
        <DropdownMenu />
        <a className="link" href="#">
          Personer vi hjälpt
        </a>
        <a className="link" href="#">
          Skola
        </a>
        <a className="link" href="#">
          Forskning
        </a>
        <a className="link" href="#">
          Kontakta oss
        </a>
        <a className="link" href="#">
          Webbshop
        </a>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}
export default NavbarR;
