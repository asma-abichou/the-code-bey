import React, { useState, useEffect } from "react";

import Widget from "./Widget";
import axios from "../../../api/axios";

const AdminCards = () => {
  const [studentsCount, setStudentsCount] = useState(0);
  const [teachersCount, setTeachersCount] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // Get the JWT token from local storage
        const token = localStorage.getItem("token");

        // Set the request headers with the JWT token
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Fetch data from /api/admin/index
        const response = await axios.get("http://127.0.0.1:8000/api/admin/index", { headers });

        const { studentsCount, teachersCount, coursesCount } = response.data;

        // Update the state variables with the fetched data
        setStudentsCount(studentsCount);
        setTeachersCount(teachersCount);
        setCoursesCount(coursesCount);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Widget type="student" number={studentsCount} />
      <Widget type="teacher" number={teachersCount} />
      <Widget type="course" number={coursesCount} />
    </div>
  );
};

export default AdminCards;
