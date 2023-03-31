import React ,{ useEffect , useRef , useState ,useLayoutEffect} from "react";
import { gsap } from "gsap";
import "../App.css" ;
import { Outlet } from 'react-router-dom'
import svg from "../whitesvg.svg" ;
import {

  BrowserRouter,
  Route,
  Link
} from "react-router-dom";

const MainLayout = () => {
    const main = useRef();
    const [animationIsFinished, setAnimationIsFinished] = useState(false) ;

    const mtl = useRef();

  useLayoutEffect(() => {
       console.log("layet out another time : "+animationIsFinished);
       const ctx = gsap.context(() => {
              mtl.current && mtl.current.progress(0).kill();
              mtl.current =   gsap.timeline().from(".menu-links ul li", {
                delay : 2 ,
                duration : 3 ,
                opacity: 0,
                x: -200,
                ease: "easeInOut" ,
                stagger : 0.08
              }) ;
            }, main);


            return () => ctx.revert();
     
   
       
      }, [animationIsFinished]);
    return (
        <>
        { animationIsFinished &&  
         <div className="nav" ref={main}>
      <div className="menu-links">
        <ul>
          <li><img src={svg}/></li>
          <Link to="/"><li>Home</li></Link>  
          <Link to="/courses"><li>courses</li></Link>  
          {/* <li>courses</li>
          <li>tutorials</li>
          <li>blogs</li>
          <li>assets</li>
          <li>contact</li> */}
        </ul>
      </div>

    </div>}
           

                    <Outlet context={[animationIsFinished, setAnimationIsFinished]}/>
            
        </>
    )
}

export default MainLayout