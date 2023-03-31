import React ,{ useLayoutEffect } from 'react'
import Content from '../components/Content'
import Title from '../components/Title'
import Certificat from '../components/Certificat'
import "../styles/layouts/course.css"
import { useOutletContext,useParams } from "react-router-dom";
import Card from './Card'
import png from "../python.svg";


const courses=[
  {title:"python1",body:"Python Description Body bla bla bla",img:png},
  {title:"python2 ",body:"Reactjs Description Body bla bla bla",img:png},
  {title:"python3",body:"Laravel Description Body bla bla bla",img:png},
  {title:"python4",body:"JavaScript Description Body bla bla bla",img:png},
  {title:"python5 ",body:"Machine Learning Description Body bla bla bla",img:png},
  {title:"python6",body:"Django Description Body bla bla bla",img:png}
]

export default function Course() {
  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  const {courseName}=useParams()
  const showNav = ()=> setAnimationIsFinished(true) ;
   
  useLayoutEffect(()=>{
    showNav();
  },[])
  return (
    <div className='Courses-container'>
      {
        courses.map((course,i)=>{
          return(
            <Card classname
            title={course.title}
            imageUrl={course.img}
            body={course.body}
            
            />
          )
        })
      }
    </div>
    
  )
}
