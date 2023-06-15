import React from "react";
import { useState, useEffect } from "react";
import CustomizedTables from "../CustomizedTables";
import { useLayoutEffect } from "react";
import axios from "../../../../api/axios";

const CourseDash = () => {
  const [response, setResponse] = useState([]);

  useLayoutEffect(() => {
    chargeStudent();
  }, []);

  const chargeStudent = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/courses/list",
        {
          headers: { "Content-Type": "application/json" },
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
    <div>
      <h1>Courses Dashboard</h1>
      <CustomizedTables rows={tableRows} headers={headers} type={"course"}></CustomizedTables>
    </div>
  );
};

export default CourseDash;
