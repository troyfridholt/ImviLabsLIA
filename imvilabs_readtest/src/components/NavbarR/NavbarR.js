import React from "react";
import "./NavbarR.css";
import { Link } from "react-router-dom";
import logo from "../../Images/IMVILOGOBLUE.png";


function NavbarR(props) {
  const { email, signedIn } = props;



  return (
    <header>
      {email !== "Not provided" ? (
        <div class="divContainer">
        <img class="headerLogo" src={logo} alt="IMVI logo" />
        {signedIn ? (
            null
        ) : (
          <div class="dropdown">
          <div class="roundcircle">{email.charAt(0).toUpperCase()}</div>
          <div class="dropdown-content">
            <Link to="/">Home</Link>
            <Link to={`/profile/${email}`}>Dashboard</Link>
            <Link to={`/settings/${email}`}>Settings</Link>
            <Link to={{ pathname: "/", search: "?signout=true" }}>Sign out</Link>
          </div>
        </div>
        )}

      </div>
    ) : (
      <img className="headerLogo" src={logo} alt="IMVI logo" />
    )}
  </header>
  );
}

export default NavbarR;
