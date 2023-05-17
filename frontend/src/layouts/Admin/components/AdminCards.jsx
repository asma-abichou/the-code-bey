import React from "react";
import Widget from "./Widget";

const AdminCards = () => {
    const studentsData=[
        { name: "Admin", to: "" },
        { name: "Students", to: "students" },
        { name: "Teachers", to: "teachers" },
        { name: "Courses", to: "courses" },
      ];
      const teachersData=[
        { name: "Admin", to: "" },
        { name: "Students", to: "students" },
        { name: "Teachers", to: "teachers" },
      ];
      const coursesData=[
        { name: "Admin", to: "" },
        { name: "Students", to: "students" },
        { name: "Teachers", to: "teachers" },
        { name: "Courses", to: "courses" },
      ];//tjib el liste lkol mta3 kol mel students wel teachers wel courses
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Widget type="student" number={studentsData.length} />
      <Widget type="teacher" number={teachersData.length} />
      <Widget type="course" number={coursesData.length} />
    </div>
  );
};

export default AdminCards;
