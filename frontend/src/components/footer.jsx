import React from "react";
import "./Footer.css"; //import css style
import logo from "../whitesvg.svg";
import ScrollToTop from "react-scroll-to-top";

const Footer = () => {
  return (
    <footer>
      <ScrollToTop smooth top="1000" style={{ backgroundColor: "#e12a85" }} />
      <ul className="footer-list">
        <li className="footer-item">
          <img src={logo} alt="" />
          <p>
            UCera is perhaps the biggest name in online courses and education.
            
          </p>
        </li>
        <li className="footer-item">
          <h4>Address</h4>
          <p>manzel ennour,Monastir,Tunisia</p>
        </li>
        <li className="footer-item">
          <h4>Contact</h4>
          <p>
            Mobile: (+88) - 1990 - 6886 <br /> Hotline: 1800 - 1102 <br /> Mail:
            contact@ucera.com
          </p>
        </li>
        <li className="footer-item">
          <h4>Hour of operation</h4>
          <p>
            Monday - Friday: 09:00 - 20:00 <br /> Sunday & Saturday: 10:30 -
            22:00
          </p>
        </li>
      </ul>
      <p className="copyright-text">
        <small>Copyright &copy; All Rights Reserved By NeuralBey.</small>
      </p>
    </footer>
  );
};

export default Footer;