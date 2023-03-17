import React from "react";
import "./Footer.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  fab,
  faFacebook,
  faLinkedin,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  library.add(fab, faFacebook, faLinkedin);

  return (
    <footer className="footer">
      <a href="https://www.facebook.com/imvilabs/" className="fa fa-facebook">
        <FontAwesomeIcon icon={faFacebook} />
      </a>
      <a
        href="https://www.linkedin.com/company/imvi-labs-ab/"
        className="fa fa-linkedin"
      >
        <FontAwesomeIcon icon={faLinkedin} />
      </a>
      <a
        href="https://www.youtube.com/channel/UCS7GjEVOO4JX7gXjwUOl-GA"
        className="fa fa-linkedin"
      >
        <FontAwesomeIcon icon={faYoutube} />
      </a>
      <a href="https://www.instagram.com/imvilabs/" className="fa fa-linkedin">
        <FontAwesomeIcon icon={faInstagram} />
      </a>
    </footer>
  );
}
