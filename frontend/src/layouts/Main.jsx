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
import axios from "../api/axios";

import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

const MainLayout = () => {
  const [user, setUser] = useState(null);
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
  console.log(auth.accessToken?.roles);
  const role = localStorage.getItem("roles");
  console.log(role);
  const pages =
    role === "ROLE_TEACHER"
      ? [
          { name: "ProfileTeacher", link: "/profil" },
          { name: "Admin", link: "/admin" },
        ]
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
              <Link to="/courses">
                <li>blogs</li>
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
                <>
                  <li id="logout" onClick={logout}>
                    Logout
                  </li>

                  <li
                    className="pimg"
                    onClick={() => navigate(pages[0].link, { replace: true })}
                  >
                    {
                      <svg
                        viewBox="0 0 448 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path>
                      </svg>
                    }
                    <h6>Profil</h6>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}

      <Outlet context={[animationIsFinished, setAnimationIsFinished]} />
    </>
  );
};

export default MainLayout;
