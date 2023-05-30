import "./cources.css";
import React, { useLayoutEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import png from "../../python.svg";
import { Link, useOutletContext } from "react-router-dom";
import axios from "../../api/axios";
import Footer from "../../components/footer";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

const courses = [
  { to: "python", title: "Python", logo: png },
  { to: "reactjs", title: "Reactjs", logo: png },
  { to: "laravel", title: "Laravel", logo: png },
  { to: "javaScript", title: "JavaScript", logo: png },
  { to: "machine learning ", title: "Machine Learning", logo: png },
  { to: "django", title: "Django", logo: png },
];
//to be replaced when consomming API

const enrolled_courses = [
  { to: "python", name: "Python", logo: png },
  { to: "reactjs", name: "Reactjs", logo: png },
  { to: "laravel", name: "Laravel", logo: png },
  { to: "javaScript", name: "JavaScript", logo: png },
  { to: "machine learning ", name: "Machine Learning", logo: png },
  { to: "django", name: "Django", logo: png },
];

export default function Courses() {
  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  const showNav = () => setAnimationIsFinished(true);
  const [response, setResponse] = useState([]);
  useLayoutEffect(() => {
    showNav();
    chargeTitle();
  }, []);
  const chargeTitle = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/category/", {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setResponse(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return (
    <div className="body2">
      <div className="courses-div">
        <h1 className="Sign">Categories</h1>
        <div className="area">
          {response.map((course, i) => {
            return (
              <Link key={i} to={""+course.id}>
                <div className="cardcateg box grid-item">
                  <p> {course.title} </p>
                </div>
              </Link>
             
            );
          })} 
        </div>
      

     </div>
     <Footer/>
    </div>
  );
}
