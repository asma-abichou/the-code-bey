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
      .get("http://127.0.0.1:8000/api/category/list", {
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
    <>
    <div className="page-header">
    <h1>FIND THE LIST OF AVAILABLE CATEGORIES ON THECODEBEY !</h1></div>
    <div className="body2">
      
      <div className="courses-div">
        <h1 className="h1courses"tyle={{ textAlign: "center", margin: "0 auto" }}></h1>
        <div className="area">
        <div className="grid-container">
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
      

     </div>
     
    </div>
    <Footer/></>
  );
}
