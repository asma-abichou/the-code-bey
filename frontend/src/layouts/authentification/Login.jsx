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
const LOGIN_URL = "users/login/";
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
      // Token exists, navigate to home page
      navigate("/");
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
    await axios
      .post(
        "http://127.0.0.1:8000/api/login",
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        console.log(response);
        console.log(response.data.token);
        console.log(response.data.RefreshToken);
        console.log(response.data.roles);
        console.log(JSON.stringify(response?.data));
        console.log(response.roles);
        console.log(response.data.id);

        //console.log(JSON.stringify(response));
        console.log(response.data.token);
        const accessToken = jwt_decode(response.data.token);
        // localStorage.setItem("accessToken", accessToken);
        console.log(accessToken.roles[0]);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("roles", accessToken.roles[0]);

        localStorage.setItem("pwd", pwd);

        localStorage.setItem("user", user);
        localStorage.setItem("is_staff", accessToken.is_staff);

        const is_staff = accessToken.is_staff;
        console.log("response :", accessToken.roles);
        console.log("is_staff :", is_staff);
        setAuth({ user, pwd, is_staff, accessToken });
        setUser("");
        setPwd("");
        navigate("/", { replace: true });
      })
      .catch((err) => {
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
      });
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
      <p>
        Need an Account?
        <br />
        <span className="line">
          <Link to="/register">Sign Up</Link>
        </span>
      </p>

      <p>
        <span className="line">
          <Link to="/Reset">forgot password ?</Link>
        </span>
      </p>
    </section>
  );
};
export default Login;

// function Login() {
// 	const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
// 	const showNav = ()=> setAnimationIsFinished(true) ;

// 	useLayoutEffect(()=>{
// 	  showNav();
// 	},[])
// 	let {loginUser} = useContext(AuthContext)
// 	return (
// 		<div>
// 			<form onSubmit={loginUser}>
// 				<input type="text" name="username" placeholder="Enter Username" />
// 				<input type="password" name="password" placeholder="Enter Password" />
// 				<input type="submit"/>
// 			</form>
// 		</div>
// 	);
//   }
