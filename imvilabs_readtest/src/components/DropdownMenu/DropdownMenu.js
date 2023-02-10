import React, { useState } from "react";
import Link from "../Link/Link";
import { dropdownItems } from "./dropdownItems";
import arrowDown from "../../Images/down-filled-triangular-arrow.png";
import "./DropdownMenu.css";

function DropdownMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="DropdownMenu">
      <a
        className="DropdownMenu__button"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        vem kan träna?
        <img className="btnIcon" src={arrowDown} />
      </a>
      {menuOpen && (
        <ul className="DropdownMenu__list">
          <li className="DropdownMenu__list-item">
            <a href="#">Samsynsproblem</a>
          </li>
          <li className="DropdownMenu__list-item">
            <a href="#">Dyslexi och läs- skrivsvårigheter</a>
          </li>
          <li className="DropdownMenu__list-item">
            <a href="#">Koncentrationsproblem och adhd</a>
          </li>
          <li className="DropdownMenu__list-item">
            <a href="#">Studier och läsning</a>
          </li>
        </ul>
      )}
    </div>
  );
}

export default DropdownMenu;
