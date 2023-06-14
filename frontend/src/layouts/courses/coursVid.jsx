import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import React, { useState, useLayoutEffect, useEffect } from "react";
import Footer from "../../components/footer";
import ReactVideoPlayer from "../ReactVideoPlayer";
import "./coursVid.css";
import Comments from "./components/comments/Comments";
import VideoInfo from "./../courses/components/video-info";
import axios from "axios";

const CoursVid = () => {
  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  
  const { courseID } = useParams();
  console.log(courseID);
  const [course, setCourse] = useState(null);
  
const navigate=useNavigate();
  const showNav = () => setAnimationIsFinished(true);

  useEffect(() => {
    showNav();
    fetchCourse();
  }, []);


  const fetchCourse = async () => {
    try {
      const token = localStorage.getItem("token"); // Replace with your actual JWT token
      if (!token) {
        navigate("/login"); // Redirect to login page if token is not available
        return;
      }
      const response = await axios.get(`http://127.0.0.1:8000/api/course/${courseID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setCourse(response.data);
      console.log(course.video);
      console.log(response.data.video);
    } catch (error) {
      console.log("Error fetching course:", error);
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  const videoUrl = `http://127.0.0.1:8000${course.video}`;
  console.log(":", videoUrl);
  
  return (
    <div className="Course-content">
      <h1 style={{ color: "white" }}>{course.title}</h1>
      <ReactVideoPlayer video={videoUrl} />
      <VideoInfo></VideoInfo>
      <Comments courseId={courseID}></Comments>

      <Footer />
    </div>
  );
};

export default CoursVid;
