import "../../styles/layouts/Login.css";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import {
  Link,
  useNavigate,
  useLocation,
  useOutletContext,
} from "react-router-dom";
import jwt_decode from "jwt-decode";
import useRefreshToken from "../../hooks/useRefreshToken";

import axios from "../../api/axios";
const LOGIN_URL = "http://127.0.0.1:8000/api/login";
const Login = () => {
  const refresh = useRefreshToken();

  const { setAuth } = useAuth();
  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  const showNav = () => setAnimationIsFinished(true);

  useLayoutEffect(() => {
    showNav();
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const role = localStorage.getItem("roles");
      console.log(role); // Retrieve the role from local storage using the key
      let destination = "/"; // Default destination
  
      if (role === "ROLE_ADMIN") {
        destination = "/admin";
      } else if (role === "ROLE_TEACHER") {
        destination = "/profil";
      } else if (role === "ROLE_STUDENT") {
        destination = "/";
      }
  
      navigate(destination);
    }
  }, [navigate]);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    try {
      const response = await axios.post(LOGIN_URL, {
        username: user,
        password: pwd,
      });
  
      const accessToken = jwt_decode(response.data.token);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("roles", accessToken.roles[0]);
      localStorage.setItem("refreshtoken", response.data.refresh_token);
      localStorage.setItem("pwd", pwd);
      localStorage.setItem("user", user);
      localStorage.setItem("is_staff", accessToken.is_staff);
  
      const is_staff = accessToken.is_staff;
      setAuth({ user, pwd, is_staff, accessToken });
      setUser("");
      setPwd("");
  
      // Redirect based on role
      if (accessToken.roles[0] === "ROLE_ADMIN") {
        navigate("/admin");
      } else if (accessToken.roles[0] === "ROLE_TEACHER") {
        navigate("/profil");
      } else if (accessToken.roles[0] === "ROLE_STUDENT") {
        navigate("/");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log("err", err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };
  

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1 className="Sign">Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <button>Sign In</button>
      </form>
      <Link to="/register" >
                  Don't have an acount Sign Up ?
                  </Link>

      
    </section>
  );
};
export default Login;

