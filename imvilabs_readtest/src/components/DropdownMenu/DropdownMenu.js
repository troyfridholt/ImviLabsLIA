import React, { useState } from "react";
import Link from "../Link/Link";
import { dropdownItems } from "./dropdownItems";
import arrowDown from "../../Images/down-filled-triangular-arrow.png";
import "./DropdownMenu.css";

function DropdownMenu() {
  const [open, setOpen] = useState(false);


  const activateDropDownMenue = (e) => {
      setOpen(true);
 
  }

  const deActivateDropDownMenue = (e) => {
      setOpen(false);
  }

  return (
    <div className="dropdownMenu-container"
      onMouseOver={activateDropDownMenue}
      onMouseOut={deActivateDropDownMenue}>
      <div
        className="dropdownTrigger"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <p>Träning för alla</p>
        <img className="dropdownArrow" src={arrowDown} alt="ArrowDown" />
      </div>

      <div className={`dropdownMenu ${open ? "active" : "inactive"}`}>
        <ul className="dropdown--ul">
          {dropdownItems.map((item) => (
            <li key={item.id} className={item.className}>
              <Link
                className="dropdown--link"
                linkText={item.title}
                url={item.path}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DropdownMenu;
