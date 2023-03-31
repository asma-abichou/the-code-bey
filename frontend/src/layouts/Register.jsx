import "../styles/layouts/Login.css"
import {Link ,useOutletContext } from "react-router-dom";
import { useRef, useState, useEffect ,useLayoutEffect} from "react";
import axios from '../api/axios';



const USER_REGEX= /^[A-z][A-z0-9-_]{3,23}$/;
const NAME_REGEX= /^[a-zA-Z\s]*.{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EML_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
const REGISTER_URL = 'users/register/';

const Register = () => {
	const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  const showNav = ()=> setAnimationIsFinished(true) ;
   
  useLayoutEffect(()=>{
    showNav();
  },[])
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

	const [firstname, setfirstname] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstnameFocus, setfirstnameFocus] = useState(false);

	const [lastname, setlastname] = useState('');
    const [validlastname, setValidlastname] = useState(false);
    const [lastnameFocus, setlastnameFocus] = useState(false);

	const [email, setemail] = useState('');
    const [validemail, setValidemail] = useState(false);
    const [emailFocus, setemailFocus] = useState(false);



    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const[role,setRole]=useState('')
    useEffect(() => {
        userRef.current.focus();
    }, [])
/////// controlled state change handler
    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

	useEffect(() => {
        setValidFirstName(NAME_REGEX.test(firstname));
    }, [firstname])

	useEffect(() => {
        setValidlastname(NAME_REGEX.test(lastname));
    }, [lastname])

	useEffect(() => {
        setValidemail(EML_REGEX.test(email));
    }, [email])


    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

	///// set default msg when retyping after error msg on one of the field 
    useEffect(() => {
        setErrMsg('');
    }, [user, email , firstname, lastname , pwd, matchPwd,role])

    const handleSubmit = async (e) => {
        e.preventDefault();
		console.log("submitted");
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
		const v3 = EML_REGEX.test(email);
        const v4 = NAME_REGEX.test(lastname);
		const v5 = NAME_REGEX.test(firstname);
      
        
        if (!v1 || !v2 || !v3 || !v4 || !v5 ) {
			const msg ="";
			!v1 && msg.concat("username ,") ;
			!v2 && msg.concat("password ,") ;
			!v3 && msg.concat("email ,") ;
			!v4 && msg.concat("lastname ,") ;
			!v5 && msg.concat("fisrtname ,") ;
            setErrMsg(msg+"Invalid Entry");
            return;
        }
        try {
            const response = await axios.post("http://127.0.0.1:8000/users/register/",
                JSON.stringify({ username : user, email : email  , first_name : firstname, last_name : lastname , password : pwd ,role:role}),
                {
                    headers: { 'Content-Type': 'application/json' },
                   
                }
            );
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            setUser('');
            setPwd('');
            setMatchPwd('');
			setfirstname('');
			setlastname('');
			setemail('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
      <>
        {success ? (
          <section>
            <h1>Success!</h1>
            <p>
              <a href="#">Sign In</a>
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

              <label htmlFor="firstname">firstname:</label>
              <input
                type="text"
                id="firstname"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setfirstname(e.target.value)}
                value={firstname}
                required
                aria-invalid={validFirstName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setfirstnameFocus(true)}
                onBlur={() => setfirstnameFocus(false)}
              />
              <p
                id="fname"
                className={
                  firstnameFocus && firstname && !validFirstName
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

              <label htmlFor="lastname">lastname:</label>
              <input
                type="text"
                id="lastname"
                autoComplete="off"
                onChange={(e) => setlastname(e.target.value)}
                value={lastname}
                required
                aria-invalid={validlastname ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setlastnameFocus(true)}
                onBlur={() => setlastnameFocus(false)}
              />
              <p
                id="lname"
                className={
                  lastnameFocus && lastname && !validlastname
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
<select id="role" name="role" required
        aria-invalid={validMatch ? "false" : "true"}
        aria-describedby="confirmnote"
        onFocus={() => setMatchFocus(true)}
        onBlur={() => setMatchFocus(false)}>
  <option value="">-- Sélectionner un rôle --</option>
  <option value="apprenant">Apprenant</option>
  <option value="formateur">Formateur</option>
</select>


              <button
                disabled={
                  !validName ||
                  !validPwd ||
                  !validMatch ||
                  !validFirstName ||
                  !validemail ||
                  !validlastname
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
}

export default Register

