import React, { useEffect, useLayoutEffect } from "react";
import Content from "../../components/Content";
import Title from "../../components/Title";
import Certificat from "../../components/Certificat";
import "./course.css";
import { useLocation, useOutletContext, useParams } from "react-router-dom";
import Card from "../Card";
import axios from "../../api/axios";
import { useState } from "react";
import img from "../../static/images/course.jpg";
import Footer from "../../components/footer";
import img2 from "../../static/images/chatt.png";

export default function SearchCourses() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('q');
  console.log("searchTerm==========", searchTerm);
  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  const showNav = () => setAnimationIsFinished(true);
  const [response, setResponse] = useState([]);
  const handleSearch = async()  =>{
    await axios.post('http://127.0.0.1:8000/api/course/search/filter', {
      title: searchTerm
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      setResponse(response.data);
    })
    .catch(error => {
      console.error('Error fetching search results', error);
    });
  

  }


  // const { CategoryID } = useParams();

  useLayoutEffect(() => {
    showNav();
    
  }, []);

useEffect (() => {
  handleSearch();
}, [searchTerm])

  return (
    <div>
      <h1 className="Sign course">Our courses</h1>
    <h5 className="Sign">Search result for "{searchTerm}"</h5>
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
