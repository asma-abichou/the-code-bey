import { useState } from "react";
import axios from "../../../../api/axios"
import CustomizedTables from "../CustomizedTables";
import { useEffect } from "react";
import { useLayoutEffect } from "react";



const StudentDash = () => {

  const [response, setResponse] = useState([]);
  useLayoutEffect(() => {
   
    chargeStudent();
  }, []);
  const chargeStudent = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/admin/students/list`, {
       
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setResponse(response.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
 
  const headers = ["id", "email", "username",  "firstName","lastName"];//tbadalhom haseb el donnees eli bech tjik ha4om houma el headers mta3 tableau
  return (
    <div>
      <h1>Students Dashboard</h1>
      <CustomizedTables rows={response} headers={headers} type={"student"} ></CustomizedTables>
    </div>
  );
};
export default StudentDash;
