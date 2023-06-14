import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

// import "./App.css" ;
import MainLayout from "./layouts/Main";
import Courses from "./layouts/courses/courses";
import Course from "./layouts/courses/course";
import Home from "./layouts/home";
import Profil from "./layouts/Trainer/Profil";
import Login from "./layouts/authentification/Login";
import Register from "./layouts/authentification/Register";
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import { Application } from 'react-rainbow-components';
import { Route, Routes } from "react-router-dom";
import Body from "./layouts/Body";
import UpdateProfil from "./layouts/Userprofil/UpdateProfile";
import Addcourse from "./layouts/Trainer/Coursesf/addcourse";

import About from "./layouts/About/About";
import CoursVid from "./layouts/courses/coursVid";
import useAuth from "./hooks/useAuth";
import axios from "./api/axios";
import UserProfil from "./layouts/Userprofil/Index";
import Addcategory from "./layouts/Trainer/Coursesf/addCategory";
import Contact from "./layouts/contact/contact";
import Admin from "./layouts/Admin/admin";
import CustomizedTables from "./layouts/Admin/components/CustomizedTables";
import StudentDash from "./layouts/Admin/components/student/StudentDash";
import StudentEdit from "./layouts/Admin/components/student/StudentEdit";
import StudentShow from "./layouts/Admin/components/student/StudentShow";
import TeacherDash from "./layouts/Admin/components/teacher/TeacherDash";
import TeacherEdit from "./layouts/Admin/components/teacher/TeacherEdit";
import TeacherShow from "./layouts/Admin/components/teacher/TeacherShow";
import CourseDash from "./layouts/Admin/components/course/CourseDash";
import CourseEdit from "./layouts/Admin/components/course/CourseEdit";
import CourseShow from "./layouts/Admin/components/course/CourseShow";
import MyCourses from "./layouts/Userprofil/MyCourses";

import SearchCourses from "./layouts/courses/searchCourses";
import AdminCards from "./layouts/Admin/components/AdminCards";

import { SocketProvider } from "./context/Socket";
import Editcourse from "./layouts/Trainer/Coursesf/editcourse";
import Chat from "./components/chat/chat";

import history from './history';
// pages
import StreamList from './layouts/streams/StreamList';
import StreamCreate from './layouts/streams/StreamCreate';
import StreamEdit from './layouts/streams/StreamEdit';
import StreamWatch from './layouts/streams/StreamWatch';
import ProfilEdit from "./layouts/Trainer/Profil/ProfilEdit";
import Editcoursete from "./layouts/Trainer/Coursesf/editcoursete"
// import Formateurhome from "./layouts/Trainer/formateurhome";
// import AddCourseForm from "./layouts/Trainer/addcourse";
export default function App() {
  const { setAuth } = useAuth();

  useEffect(() => {
    setAuth({ user: localStorage.getItem('user'), pwd: localStorage.getItem('pwd'), is_staff: localStorage.getItem('is_staff'), accessToken: localStorage.getItem('accessToken'),allowedRoles: localStorage.getItem('roles') });
    console.log(setAuth);
  }, [])
  return <>
    
      <Routes>


        <Route path="/" element={<MainLayout />}>
          <Route path="login" element={<Login />} />
          {/* <Route path="AddCourseForm" element={<AddCourseForm/>} /> */}

          
          <Route path="About" element={<About />} />
        

          {/* <Route path="formateurSpace" element={<Formateurhome/>} /> */}
          <Route path="register" element={<Register />} />
          <Route path="search" element={<SearchCourses />} />
          <Route path="search/:courseID" element={<CoursVid />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route index element={<Home />} />
          <Route element={<RequireAuth allowedRoles={['User']} />}>
            <Route path="courses" element={<Courses />} />
            <Route path="contact" element={<Contact />} />
            <Route path="editcourse" element={<Editcourse />} />
            <Route path="editcourse/edit/:id" element={<Editcoursete/>} />

            {/* <Route path="livestream" element={<livee/>} /> */}
        


          </Route>
          <Route element={<RequireAuth allowedRoles={['User']} />}>
            <Route path="courses/:CategoryID" element={<Course />} />
            <Route path="courses/All" element={<Course />} />
            <Route path="courses/:CategoryID/:courseID" element={<CoursVid />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={['User']} />}>
            <Route path="admin" element={<Admin />}>

              <Route path="" element={<AdminCards></AdminCards>} />

              <Route path="students" element={<StudentDash></StudentDash>} />
              <Route
                path="students/edit/:id"
                element={<StudentEdit></StudentEdit>}
              />
              <Route
                path="students/show/:id"
                element={<StudentShow></StudentShow>}
              />

              <Route path="teachers" element={<TeacherDash></TeacherDash>} />
              <Route
                path="teachers/edit/:id"
                element={<TeacherEdit></TeacherEdit>}
              />
              <Route
                path="teachers/show/:id"
                element={<TeacherShow></TeacherShow>}
              />

              <Route path="courses" element={<CourseDash></CourseDash>} />
              <Route
                path="courses/edit/:id"
                element={<CourseEdit></CourseEdit>}
              />
              <Route
                path="courses/show/:id"
                element={<CourseShow></CourseShow>}
              />
            </Route>
          </Route>
          <Route element={<RequireAuth allowedRoles={['User']} />}>
            <Route path="profil" element={<Profil />} />
            <Route path="userprofil" element={<UserProfil />} />
            <Route path="profil/edit/:id" element={<ProfilEdit></ProfilEdit>} />
            <Route path="MyCourses" element={<MyCourses />} />
            <Route path="MyCourses/:courseID" element={<CoursVid />} />
            <Route path="Addcourse" element={<Addcourse />} />
            <Route path="Addcategory" element={<Addcategory />} />
          </Route>

          <Route history={history}>
            <Route path="streams" element={<StreamList />}/>
            <Route exact path="stream/new" element={<StreamCreate />}/>
            <Route path="stream/edit/:id"  element={<StreamEdit />}/>
            <Route path="stream/watch/:id" element={<StreamWatch />}/>
          </Route>

        </Route>


      </Routes>   
  </>


};
{/* If the current URL is /about, this route is rendered
            while the rest are ignored */}







