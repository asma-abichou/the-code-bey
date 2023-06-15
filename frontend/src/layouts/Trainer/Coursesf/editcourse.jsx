import React from "react";
import { useState, useEffect } from "react";
import CustomizedTables from "../../Admin/components/CustomizedTables";
import { useLayoutEffect } from "react";
import axios from "../../../api/axios";
import "./editcourse.css"
import { useOutletContext } from "react-router-dom";
const CourseDash = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem('user');
console.log(user);

  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  const showNav = () => setAnimationIsFinished(true);
  useLayoutEffect(() => {
    showNav();
  }, []);
  const [response, setResponse] = useState([]);

  useLayoutEffect(() => {
    chargeStudent();
  }, []);

  const chargeStudent = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("JWT Token not found");
        return;
      }
  
      const response = await axios.get(
        "http://127.0.0.1:8000/api/teacher/created-courses",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      setResponse(response.data);
    } catch (err) {
      console.log("err", err);
    }
  };
  

  const headers = ["id", "title", "description", "category", "duration", "video"];

  const getCategoryTitle = (category) => {
    if (category && category.title) {
      return category.title;
    }
    return "";
  };

  const tableRows = response.map((row) => ({
    ...row,
    category: getCategoryTitle(row.category),
  }));

  return (
    <div className="editcourse">
      <h1>Courses Dashboard {user}</h1>
      <CustomizedTables rows={tableRows} headers={headers} type={"course"}></CustomizedTables>
    </div>
  );
};

export default CourseDash;
