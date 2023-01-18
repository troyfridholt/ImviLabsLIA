import React from "react";

function Link({ linkText, url }) {
  return <a href={url}>{linkText}</a>;
}

export default Link;
