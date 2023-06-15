import "../../styles/layouts/Login.css";
import { Link, useOutletContext } from "react-router-dom";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import axios from "../../api/axios";
import "../../styles/layouts/registre.css";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const NAME_REGEX = /^[a-zA-Z\s]*.{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EML_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


const Register = () => {
  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  const showNav = () => setAnimationIsFinished(true);

  useLayoutEffect(() => {
    showNav();
  }, []);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [firstName, setfirstName] = useState("");
  const [validfirstName, setValidfirstName] = useState(false);
  const [firstNameFocus, setfirstNameFocus] = useState(false);

  const [lastName, setlastName] = useState("");
  const [validlastName, setValidlastName] = useState(false);
  const [lastNameFocus, setlastNameFocus] = useState(false);

  const [email, setemail] = useState("");
  const [validemail, setValidemail] = useState(false);
  const [emailFocus, setemailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [role, setRole] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleRoleChange = (event) => {
    setRole(event.target.value); // update role state when user selects an option
  };

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidfirstName(NAME_REGEX.test(firstName));
  }, [firstName]);

  useEffect(() => {
    setValidlastName(NAME_REGEX.test(lastName));
  }, [lastName]);

  useEffect(() => {
    setValidemail(EML_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, email, firstName, lastName, pwd, matchPwd, role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");

    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EML_REGEX.test(email);
    const v4 = NAME_REGEX.test(firstName);
    const v5 = NAME_REGEX.test(lastName);
    const v6 = pwd === matchPwd;

    if (v1 && v2 && v3 && v4 && v5 && v6) {
      const response = await fetch( "http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user,
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: pwd,
          role: role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful
        setSuccess(true);
        setUser("");
        setfirstName("");
        setlastName("");
        setemail("");
        setPwd("");
        setMatchPwd("");
        setErrMsg("");
      } else {
        // Registration failed
        setErrMsg(data.message);
      }
    } else {
      setErrMsg("Invalid input");
    }
  };

  return (
    <>
      {success ? (
     <section style={{ background: "#203e4a", padding: "20px" }}>
     <h1 style={{ color: "#fff", textAlign: "center" }}>Success!</h1>
     <p style={{ textAlign: "center", color: "#fff" }}>
       Click <Link to="/login" style={{ color: "#007bff" }}>here</Link> to go to the login page.
     </p>
   </section>
   
     
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="Sign">Register</h1>
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
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <label htmlFor="firstName">firstName:</label>
            <input
              type="text"
              id="firstName"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setfirstName(e.target.value)}
              value={firstName}
              required
              aria-invalid={validfirstName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setfirstNameFocus(true)}
              onBlur={() => setfirstNameFocus(false)}
            />
            <p
              id="fname"
              className={
                firstNameFocus && firstName && !validfirstName
                  ? "instructions"
                  : "offscreen"
              }
            >
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, allowed . numbers, underscores, hyphens not allowed.
            </p>

            <label htmlFor="lastName">lastName:</label>
            <input
              type="text"
              id="lastName"
              autoComplete="off"
              onChange={(e) => setlastName(e.target.value)}
              value={lastName}
              required
              aria-invalid={validlastName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setlastNameFocus(true)}
              onBlur={() => setlastNameFocus(false)}
            />
            <p
              id="lname"
              className={
                lastNameFocus && lastName && !validlastName
                  ? "instructions"
                  : "offscreen"
              }
            >
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, allowed . numbers, underscores, hyphens not allowed.
            </p>

            <label htmlFor="email">email:</label>
            <input
              type="email"
              id="email"
              autoComplete="on"
              onChange={(e) => setemail(e.target.value)}
              value={email}
              required
              aria-invalid={validemail ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setemailFocus(true)}
              onBlur={() => setemailFocus(false)}
            />
            <p
              id="eml"
              className={
                emailFocus && email && !validemail
                  ? "instructions"
                  : "offscreen"
              }
            >
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              not a valid email expression please try again ,
            </p>

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>

            <label htmlFor="confirm_pwd">Confirm Password:</label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              Must match the first password input field.
            </p>
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              name="role"
              required
              value={role}
              onChange={handleRoleChange}
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            >
              <option value="">-- Sélectionner un rôle --</option>
              <option value="student">student</option>
              <option value="teacher">teacher</option>
            </select>

            <button
              disabled={
                !validName ||
                !validPwd ||
                !validMatch ||
                !validfirstName ||
                !validemail ||
                !validlastName
                  ? true
                  : false
              }
            >
              Sign Up
            </button>
          </form>

          <p>
            Already registered?
            <br />
            <span className="line">
              <Link to="/login">Sign In</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
