import React from "react";
import "./Footer.css"; //import css style
import logo from "../hawa.png";
import ScrollToTop from "react-scroll-to-top";

const Footer = () => {
  return (
    <footer>
      <ScrollToTop smooth top="1000" style={{ backgroundColor: "#e12a85" }} />
      <ul className="footer-list">
        <li className="footer-item">
          <img src={logo} alt="" />
          <p>
          TheCodeBey Programming Life 
            
          </p>
        </li>
        <li className="footer-item">
          <h4>Address</h4>
          <p>manzel ennour,Monastir,Tunisia</p>
        </li>
        <li className="footer-item">
          <h4>Contact</h4>
          <p>
            Mobile: (+216) 54 701 163  <br /> code postal: <br /> Mail:
            neuralbey@gmail.com
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