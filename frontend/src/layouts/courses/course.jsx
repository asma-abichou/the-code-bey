import React ,{ useLayoutEffect } from 'react'
import Content from '../../components/Content'
import Title from '../../components/Title'
import Certificat from '../../components/Certificat'
import "./course.css"
import { useOutletContext,useParams } from "react-router-dom";
import Card from '../Card'
import axios from '../../api/axios'
import { useState } from 'react'



const courses=[
  {title:"python1",body:"Python Description Body bla bla bla"},
  {title:"python2 ",body:"Reactjs Description Body bla bla bla"},
  {title:"python3",body:"Laravel Description Body bla bla bla"},
  {title:"python4",body:"JavaScript Description Body bla bla bla"},
  {title:"python5 ",body:"Machine Learning Description Body bla bla bla"},
  {title:"python6",body:"Django Description Body bla bla bla"}
]

export default function Course() {
  const {idCateg}=useParams();
  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  const {courseName}=useParams()
  const showNav = ()=> setAnimationIsFinished(true) ;
  const [response, setResponse] = useState([]);
  useLayoutEffect(() => {
    showNav();
    chargeCourses();
  }, []);
  const chargeCourses = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/course/`, {//`http://127.0.0.1:8000/api/course/${idCateg}`
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setResponse(response.data);
        console.log(response);
        console.log(idCateg);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return (
    <div className='Courses-container'>
      {
        response.map((course,i)=>{
          return(
            <Card classname
            key={i}
            title={course.title}
            body={course.description}
            
            />
          )
        })
      }
    </div>
    
  )
}
