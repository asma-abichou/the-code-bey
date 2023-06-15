import React, { useLayoutEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import axios from "../../api/axios";
import Card from "../Card";
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

  const chargeCourses = async () => {
    const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage or wherever it is stored
  
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/course/category/${CategoryID}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      });
  
      setResponse(response.data);
      console.log('category============', response.data);
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <div>
      <h1 className="Sign course">Courses for {response.length > 0 ? response[0].category.title : ''}</h1>
      <div className="courses-container">
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
