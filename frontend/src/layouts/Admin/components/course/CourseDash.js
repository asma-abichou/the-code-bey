import { useState } from "react";
import CustomizedTables from "../CustomizedTables";
import { useLayoutEffect } from "react";
import axios from "../../../../api/axios";

const CourseDash = () => {
  
  const [response, setResponse] = useState([]);
  useLayoutEffect(() => {
   
    chargeStudent();
  }, []);
  const chargeStudent = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/admin/course/list`, {
       
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setResponse(response.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const headers = ["id", "title","description","duration" , "video"];
  return (
    <div>
      <h1>Courses Dashboard</h1>
      <CustomizedTables rows={response} headers={headers} type={"course"}></CustomizedTables>
    </div>
  );
};
export default CourseDash;
