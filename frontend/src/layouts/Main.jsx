import React ,{   useContext , useRef , useState ,useLayoutEffect} from "react";
import { gsap } from "gsap";
import "../App.css" ;
import { Outlet , useNavigate, Link} from 'react-router-dom'
import svg from "../whitesvg.svg" ;
import AuthContext from "../context/AuthProvider";
import useAuth from "../hooks/useAuth";
import Footer from "../components/footer";

const MainLayout = () => {
  const [searchTerm, setSearchTerm] = useState('')
    const main = useRef();
    const [animationIsFinished, setAnimationIsFinished] = useState(false) ;
    const { setAuth } = useContext(AuthContext);
    const { auth } = useAuth();
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/');
    }

    const mtl = useRef();

  useLayoutEffect(() => {
      
       console.log("layet out another time : "+animationIsFinished);
       const ctx = gsap.context(() => {
              mtl.current && mtl.current.progress(0).kill();
              mtl.current =   gsap.timeline().from(".nav", {
                delay : 1 ,
                duration : 1.2 ,
                opacity: 0,
                y: -200,
                ease: "easeInOut" ,
         
              }).from(".menu-links ul li", {
              
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
          <Link to="courses"><li>courses</li></Link>  
          <Link to="/courses"><li>blogs</li></Link> 
          <Link to="/courses"><li>forum</li></Link> 
          <Link to="/About"><li>About</li></Link> 
          {auth.user && <li id="logout" onClick={logout} >Logout</li>}
          <li className="search-bar">
          <input type="Search" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} class="input-style" />

              </li>
        </ul>
      </div>

    </div>}
           

                    <Outlet context={[animationIsFinished, setAnimationIsFinished]}/>

             
        </>
    )
}

export default MainLayout