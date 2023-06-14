import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import "../App.css";
import Courses from "./courses/courses";
import { Link } from "react-router-dom";
import Body from "./Body";
import Second from "../components/second";
import useAuth from "../hooks/useAuth";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import svg from "../whitesvg.svg";

import { useOutletContext } from "react-router-dom";
import Footer from "../components/footer";

export default function Home() {
  const [authenticated, setAuth] = useState();
  console.log("home : outside ule / " + authenticated?.user);
  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  const [cubeISReady, setCubeISReady] = useState(false);
  const showNav = () => setAnimationIsFinished(true);
  const hideNav = () => setAnimationIsFinished(false);
  const showCube = () => {
    showNav();
    setCubeISReady(true);
  };
  const hideCube = () => setCubeISReady(false);

  const app = useRef();

  const tl = useRef();
  useEffect(() => {
    console.log("body : inside ule / " + authenticated?.user);
  }, [authenticated]);
  useLayoutEffect(() => {
    hideNav();
    hideCube();

    const ctx = gsap.context(() => {
      tl.current && tl.current.progress(0).kill();

      tl.current = gsap
        .timeline()
        .to(".overlay h1", {
          delay: 0,
          duration: 0,
          opacity: 0,
          y: -60,
          ease: "easeInOut",
        })
        .to(".overlay span", {
          duration: 0,
          opacity: 0,
          y: -60,
          ease: "easeInOut",
        })
        .to(".overlay", {
          duration: 0,
          top: "-150%",
          ease: "easeInOut",
          onComplete: showCube,
        });
    }, app);
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <React.Fragment>
      <div className="App" ref={app}>
       
        {cubeISReady && <Body auth={authenticated} />}
        {cubeISReady && (
          <div className="mouse">
            <div className="roll"></div>
            <div className="rollshadow"></div>
          </div>
        )}

        {cubeISReady && <Second />}

        {cubeISReady && <Footer />}
      </div>
    </React.Fragment>
  );
}

{
  /* <div className="wrapper">
      <div className="text">
      <div className="title">TheCodeBey</div>
      <p> <br/> Breath, Programming With Us </p>
    </div>
    <div className="watchnow">
      <i className="fa fa-play"></i>
      <a href="#">
      <Link to="login">
      join us now!</Link> 
      </a>
    </div>
    <div className="mouse">
  <div className="roll"></div>
  <div className="rollshadow"></div>
</div>
    {/* <div className="scrolldown">scroll</div>
  {/* </div>  */
}
{
  /*      
      <div className="section"></div>
      <div className="section"></div>
      <div className="section"></div>
      <div className="section"></div>
      <div className="section"></div> */
}
