import React ,{ useEffect , useRef , useState ,useLayoutEffect} from "react";
import { gsap } from "gsap";
import "../App.css" ;
import Courses from "../src/layouts/courses";
import { Link } from "react-router-dom";
import Body from "../src/layouts/Body";

import svg from "../whitesvg.svg" ;


import { useOutletContext } from "react-router-dom";

export default function Home() {
  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  const showNav = ()=> setAnimationIsFinished(true) ;
  const hideNav = ()=> setAnimationIsFinished(false) ;
  
  
   
  const app = useRef();

    const tl = useRef();

  useLayoutEffect(() => {
      hideNav();
   
        const ctx = gsap.context(() => {
          
        tl.current && tl.current.progress(0).kill();

          tl.current = gsap.timeline().to(".overlay h1", {
            delay : 1 ,
            duration : 1.2 ,
            opacity: 0,
            y: -60,
            ease: "easeInOut"
          }).to(".overlay span",  {
            duration : 1.2 ,

            opacity: 0,
            y: -60,
            ease: "easeInOut"
          }).to(".overlay",{
            duration :2 ,
   
            top: "-150%",
            ease: "easeInOut",
            
            onComplete	: showNav 
          }).from(".ellipse-container",  {
            duration : 1 ,

            opacity: 0,
            ease: "easeInOut"
          } ).from(".yellow", {
            duration : 1 ,

            opacity: 0,
            ease: "easeInOut"
          }).from(".menu-links ul li", {
            duration : 1 ,

            opacity: 0,
            x: -100,
            ease: "easeInOut" ,
            stagger : 0.08
          }).from(".text .title",  {
            duration  : 1 ,

            opacity: 0,
            x: 200,
            ease: "easeInOut" ,
          }).from(".text p",  {
            duration : 1 ,
            opacity: 0,
            x: 200,
            ease: "easeInOut"
          } ).from(".watchnow", {
            duration : 1 ,
            opacity: 0,
            x: 200,
            ease: "easeInOut"
          }).from(".media ul li",  {
            duration : 1 ,
            opacity: 0,
            y: 100,
            ease: "easeInOut" ,
            stagger : 0.08
          }).from(".mouse",  {
            duration : 1 ,

            opacity: 0,
            y: 100,
            ease: "easeInOut"
          });
        }, app);
        return () => {
          ctx.revert()
          showNav()
        };
      }, []);



  return (
    <React.Fragment>
    <div className="App container" ref={app}>
     <div className="Header section ">
     <div className="overlay">
    <h1>TheCodeBey</h1>
    <span>programming life</span>
  </div>

  <div className="wrapper">
 
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

   

    <div className="ellipse-container">
     <img src={svg }/>
      {/* <div className="ellipse thin"></div> */}
      <div className="ellipse thick"></div>
      <div className="ellipse yellow"></div>
      
    </div>

    <div className="mouse">
  <div className="roll"></div>
  <div className="rollshadow"></div>
</div>


    {/* <div className="scrolldown">scroll</div> */}

  </div>

     </div>
{/*      
      <div className="section"></div>
      <div className="section"></div>
      <div className="section"></div>
      <div className="section"></div>
      <div className="section"></div> */}
     
    </div>
    <Body/>
    </React.Fragment>
  );
}


