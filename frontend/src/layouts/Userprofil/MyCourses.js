import React, { useLayoutEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import axios from '../../api/axios';
import Card from "../Card";
import img2 from "../../static/images/course.jpg";
import img  from "../../static/images/chatt.png"

const MyCourses = () => {
    const [response, setResponse] = useState([]);
    const chargeCourses = async () => {
        await axios
          .get(`http://127.0.0.1:8000/api/student/subscribed-courses`, {
           
            headers: { "Content-Type": "application/json" },
          })
          .then((response) => {
            setResponse(response.data);
          })
          .catch((err) => {
            console.log("err", err);
          });
      };
    
  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  const showNav = () => setAnimationIsFinished(true);

  useLayoutEffect(() => {
    showNav();
    chargeCourses();
  }, [])
  return (
    <div>
    <h1 className="Sign course">My Courses</h1>
    <div className="courses-container ">
      {response.map((course, i) => {
        return (
          <Card
            classname
            key={i}
            id={course.id}
            title={course.title}
            body={course.description}
            imageUrl={img2}
            subscribed = {true}
          />
        );
      })}
      <a href="#" className="chat-bubble">
        <img src={img} alt="Chat bubble icon" />
      </a>
    </div>
  </div>
);
}


export default MyCourses