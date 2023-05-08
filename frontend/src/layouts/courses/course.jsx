import React, { useLayoutEffect } from "react";
import Content from "../../components/Content";
import Title from "../../components/Title";
import Certificat from "../../components/Certificat";
import "./course.css";
import { useOutletContext, useParams } from "react-router-dom";
import Card from "../Card";
import axios from "../../api/axios";
import { useState } from "react";
import img from "../../static/images/course.jpg";
import Footer from "../../components/footer";
import img2 from "../../static/images/chatt.png";

export default function Course() {
  const { CategoryID } = useParams();
  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  const showNav = () => setAnimationIsFinished(true);
  const [response, setResponse] = useState([]);
  useLayoutEffect(() => {
    showNav();
    chargeCourses();
  }, []);
  console.log("category============", CategoryID);
  const chargeCourses = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/course/category/${CategoryID}`, {
        //`http://127.0.0.1:8000/api/course/${idCateg}`
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setResponse(response.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return (
    <div>
      <h1 className="Sign course">Our courses</h1>
      <div className="courses-container ">
        {response.map((course, i) => {
          return (
            <Card
              classname
              key={i}
              id={course.id}
              title={course.title}
              body={course.description}
              imageUrl={img}
            />
          );
        })}
        <a href="#" className="chat-bubble">
          <img src={img2} alt="Chat bubble icon" />
        </a>
      </div>
    </div>
  );
}
