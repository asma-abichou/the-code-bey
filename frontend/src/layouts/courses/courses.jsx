import "./cources.css";
import React, { useLayoutEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import png from "../../python.svg";
import { Link, useOutletContext } from "react-router-dom";
import axios from "../../api/axios";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

const courses = [
  { to: "python", name: "Python", logo: png },
  { to: "reactjs", name: "Reactjs", logo: png },
  { to: "laravel", name: "Laravel", logo: png },
  { to: "javaScript", name: "JavaScript", logo: png },
  { to: "machine learning ", name: "Machine Learning", logo: png },
  { to: "django", name: "Django", logo: png },
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
    <div className="body">
      <div className="courses-div">
        <h1 className="Sign">Erolled Cources</h1>
        <div className="area">
          {response.map((course, i) => {
            return (
              <Link key={course.id} to={course.title}>
                <div className="box grid-item">
                  <p> {course.title}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="courses-div">
        <h1>Enroll New Cources</h1>
        <div className="area">
          {response.map((course, i) => {
            return (
              <Link key={i} to={course.to}>
                <div className="box grid-item">
                  <p> {course.name}</p>
                  <img alt={course.name} src={course.logo} className="llogo" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
