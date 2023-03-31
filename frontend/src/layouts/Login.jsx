import "../styles/layouts/Login.css"
import {  useLayoutEffect , useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation ,useOutletContext} from 'react-router-dom';
import jwt_decode from "jwt-decode";

import axios from '../api/axios';
const LOGIN_URL = 'users/login/';
const Login =() => {
    const { setAuth } = useAuth();
	const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
    const showNav = ()=> setAnimationIsFinished(true) ;

	useLayoutEffect(()=>{
		showNav();
	  },[])
   
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submit");
            const response = await axios.post("http://127.0.0.1:8000/users/login/",
                JSON.stringify({'username':user, 'password':pwd}),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            ).then((response)=> {
                console.log(response);
                console.log(response.data.access);
                console.log(JSON.stringify(response?.data));
                //console.log(JSON.stringify(response));
                const accessToken = jwt_decode(response.data.access);
                const is_staff = accessToken.is_staff;
                 console.log("response :"+accessToken.is_staff)
                 console.log("is_staff :"+is_staff)
                setAuth({ user, pwd, is_staff, accessToken });
                setUser('');
                setPwd('');
                navigate("/courses", { replace: true });


            }).catch((err)=>{
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        });
    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
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
                Need an Account?<br />
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

    )
}
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