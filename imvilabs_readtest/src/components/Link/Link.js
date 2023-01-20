import React from "react";
import "./Link.css";

function Link({ linkText, url }) {
  return (
    <a className="link" href={url}>
      {linkText}
    </a>
  );
}

export default Link;
