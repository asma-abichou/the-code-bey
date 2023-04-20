import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

// import "./App.css" ;
import MainLayout from "./layouts/Main";
import Courses from "./layouts/courses";
import Course from "./layouts/course";
import Home from "./layouts/home";
import Profil from "./layouts/Trainer/Profil"; 
import Login from "./layouts/Login";
import Register from "./layouts/Register";
import Admin from './components/Admin';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import { Application } from 'react-rainbow-components';
import { Route, Routes } from "react-router-dom";
import Body from "./layouts/Body";
import UpdateProfile from "./layouts/Userprofil/UpdateProfil";
import Addcourse from "./layouts/Trainer/Coursesf/addcourse";
import ForgotPassword from "./components/Resetpassword";
import About from "./layouts/About/About";
import CoursVid from "./layouts/coursVid";
import useAuth from "./hooks/useAuth";
import axios from "./api/axios";
import UserProfil from "./layouts/Userprofil/Index";
import Addcategory from "./layouts/Trainer/Coursesf/addCategory";
// import Formateurhome from "./layouts/Trainer/formateurhome";
// import AddCourseForm from "./layouts/Trainer/addcourse";
export default function App() {
  const { setAuth } = useAuth();

  useEffect(()=>{
    setAuth({ user:localStorage.getItem('user'), pwd:localStorage.getItem('pwd') , is_staff: localStorage.getItem('is_staff'), accessToken:localStorage.getItem('accessToken') });
console.log(setAuth);
  },[])
  return <>

    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="login" element={<Login />} />
        {/* <Route path="AddCourseForm" element={<AddCourseForm/>} /> */}
       
        <Route path="Reset" element={<ForgotPassword/>} />
        <Route path="About" element={<About/>} />

        {/* <Route path="formateurSpace" element={<Formateurhome/>} /> */}
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route index element={<Home />} />
        <Route element={<RequireAuth allowedRoles={[ 'User']} />}>
          <Route path="courses" element={<Courses />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={['User']} />}>
          <Route path="courses/:courseName" element={<Course />} />
          <Route path="courses/:courseName/:courseID" element={<CoursVid />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={['User']} />}>
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={['User']} />}>
          <Route path="profil" element={<Profil />} />
          <Route path="userprofil" element={<UserProfil />} />
          <Route path="Addcourse" element={<Addcourse />} />
          <Route path="Addcategory" element={<Addcategory/>} />
        </Route>
        
        <Route path="update" element={<UpdateProfile/>} />
      </Route>
    

    </Routes>
  </>


};
{/* If the current URL is /about, this route is rendered
            while the rest are ignored */}







