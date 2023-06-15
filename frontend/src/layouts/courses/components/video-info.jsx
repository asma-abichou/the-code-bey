import React, { useState, useEffect } from "react";
import "./video-info.css";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Person4OutlinedIcon from "@mui/icons-material/Person4Outlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import axios from "../../../api/axios";
import { useParams } from "react-router-dom";

const VideoInfo = () => {
  const { courseID } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/course/${courseID}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setCourseDetails(response.data);
      console.log("Fetched course:", response.data);
    } catch (error) {
      console.log("Error fetching course:", error);
    }
  };

  if (!courseDetails) {
    return <div>Loading...</div>;
  }

  const { duration, description, teacher, email } = courseDetails;

  return (
    <div className="videoInfo">
      <div className="content-wrapper">
        <div className="content-wrapper__left">
          <h4>{description}</h4>
          <h4>Teacher Information :</h4>
          
          <h4>
            <Person4OutlinedIcon />
            {teacher.firstName} {teacher.lastName}
          </h4>
          <h4>
            <EmailOutlinedIcon />
            {teacher.email}
          </h4>
        </div>
        <div className="content-wrapper__right">
          <h4>
            <PlayArrowOutlinedIcon style={{ paddingTop: "9px" }} />
            {duration}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;
