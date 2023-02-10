import { FaBars, FaTimes } from "react-icons/fa";
import React from "react";
import Link from "../Link/Link";
import { useRef } from "react";
import "./NavbarR.css";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import logo from "../../Images/imvi-logo.png";
import flagIcon from "../../Images/sweden.png";
import cartIcon from "../../Images/shopping-cart.png";

function NavbarR() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <img className="headerLogo" src={logo} />
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
        <a href="https://imvilabs.com/sv/varukorg/">
          <img className="nav--cartIcon" src={cartIcon} alt="Cart" />
        </a>
        <button className="nav--btn" type="button">
          Testa dig gratis
        </button>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <img className="nav--flagIcon" src={flagIcon} alt="Flag" />
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}
export default NavbarR;
