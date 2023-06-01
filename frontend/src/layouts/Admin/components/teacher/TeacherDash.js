import { useState } from "react";
import CustomizedTables from "../CustomizedTables";
import { useLayoutEffect } from "react";
import axios from "../../../../api/axios";

const TeacherDash = () => {
  const [response, setResponse] = useState([]);
  useLayoutEffect(() => {
   
    chargeStudent();
  }, []);
  const chargeStudent = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/admin/teachers/list`, {
       
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setResponse(response.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  function createData(ID, Nom, Prenom, Username,Email) {
    return { ID, Nom, Prenom, Username,Email };
  }
  const rows = [
    createData(0, "Ben Salah", "Mounir", "6.0, 24", 4.0),
    createData(1, "Hawala", "Salah", "9.0, 37", 4.3),
    createData(2, "yess", "Red3i"," 16.0, 24", 6.0),
    createData(3, "Charada", "Yessine", "3.7, 67", 4.3),
    createData(4, "hawala", "teacher", "16.0, 49", 3.9),
  ];
  const headers = ["id", "email", "username",  "firstName","lastName"];
  return (
    <div>
      <h1>Teachers Dashboard</h1>
      <CustomizedTables rows={response} headers={headers} type={"teacher"}></CustomizedTables>
    </div>
  );
};
export default TeacherDash;
