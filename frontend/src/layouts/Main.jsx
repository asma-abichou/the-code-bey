import React, {
  useContext,
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
} from "react";
import { gsap } from "gsap";
import "../App.css";
import { Outlet, useNavigate, Link } from "react-router-dom";
import svg from "../whitesvg.svg";
import AuthContext from "../context/AuthProvider";
import useAuth from "../hooks/useAuth";
import Footer from "../components/footer";

import Chatbot from "react-chatbot-kit";
import MessageParser from "./chatbot/MessageParser";
import ActionProvider from "./chatbot/ActionProvider";
import config from "./chatbot/config";
import chatbot from "./chatbot/chatbot.css";
import img2 from "../static/images/chatt.png";
import AccountMenu from "./AccountMenu"

const MainLayout = () => {
  const [user, setUser] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const main = useRef();
  const [animationIsFinished, setAnimationIsFinished] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const { auth } = useAuth();
  const username = auth.user;

  const firstLetter = username?.charAt(0).toUpperCase();

  const logout = async () => {
    // Remove the stored items from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    localStorage.removeItem("pwd");
    localStorage.removeItem("user");
    localStorage.removeItem("is_staff");
    localStorage.removeItem("refreshtoken");

    // Clear the authentication state
    setAuth({});

    // Redirect the user to the desired location (e.g., home page)
    navigate("/");
  };

  const mtl = useRef();

  useLayoutEffect(() => {
    console.log("layet out another time : " + animationIsFinished);
    const ctx = gsap.context(() => {
      mtl.current && mtl.current.progress(0).kill();
      mtl.current = gsap
        .timeline()
        .from(".nav", {
          delay: 1,
          duration: 1.2,
          opacity: 0,
          y: -200,
          ease: "easeInOut",
        })
        .from(".menu-links ul li", {
          duration: 3,
          opacity: 0,
          x: -200,
          ease: "easeInOut",
          stagger: 0.08,
        });
    }, main);

    return () => ctx.revert();
  }, [animationIsFinished]);
  console.log(auth.user)
  console.log(auth.accessToken?.roles);
  const role = localStorage.getItem("roles");
  console.log(role);
  const pages =
  role === "ROLE_TEACHER"
  ? [
      { name: "ProfileTeacher", link: "/profil" },
      { name: "Admin", link: "/admin" },
    ]
  : role === "ROLE_ADMIN"
  ? [{ name: "ProfileUser", link: "/admin" }]
  : [{ name: "ProfileUser", link: "/userprofil" }];

  return (
    <>
      {animationIsFinished && (
        <div className="navbar" ref={main}>
          <div className="menu-links">
            <ul>
              <img src={svg} alt="theCodeBey" />
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="courses">
                <li>courses</li>
              </Link>
              <Link to="/streams">
                <li>LiveStream</li>
              </Link>
              <Link to="/About">
                <li>About</li>
              </Link>
              <Link to="/contact">
                <li>Contact US</li>
              </Link>
              <li className="search-bar">
                <input
                  type="search"
                  placeholder="Search for courses"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-style"
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      navigate(`/search?q=${searchTerm}`, { replace: true });
                      event.preventDefault();
                    }
                  }}
                />
              </li>
              

              {auth.user && (
                
                <AccountMenu />
              )}
            </ul>
      
          </div>
        </div>
      )}
          {showChatbot && ( // Conditional rendering for chatbot component
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
          headerText={"TheCodeBey ChatBot"}
        />
      )}
            

      <Outlet context={[animationIsFinished, setAnimationIsFinished]} />
      <a href="#" className="chat-bubble">
          <img src={img2} alt="Chat bubble icon" onClick={() => setShowChatbot(!showChatbot)} />
        </a>
    </>
  );
};

export default MainLayout;
