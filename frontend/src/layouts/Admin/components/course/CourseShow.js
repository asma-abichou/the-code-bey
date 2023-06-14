import React from "react";
import { useLayoutEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../../../api/axios";

const CourseShow = () => {
  const { id } = useParams();
  const [response, setResponse] = useState([]);
  useLayoutEffect(() => {
   
    chargeStudentId();
  }, []);
  const chargeStudentId = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/admin/courses/show/${id}`, {
       
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setResponse(response.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  // Get authentication token from local storage

  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");

  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null); // new state variable
  const [categories, setCategories] = useState([]);

  const [isSubmitted, setIsSubmitted] = useState(false); // new state variable

  return (
    <div>
      <div
        className="addcourse form-container box"
        style={{ backgroundColor: "transparent", color: "black" }}
      >
        <form className="form2" style={{ color: "black" }}>
          <div className="form-title">
            <h1 className="Sign">Course Preview</h1>
          </div>
          <div className="form-row">
            <label htmlFor="id">ID :</label>
            <input disabled type="text" id="id" value={id} />
            <label htmlFor="name">Title :</label>
            <input disabled type="text" id="name" value={response.title} />
            <label htmlFor="duration">Duration :</label>
            <input disabled type="text" id="duration" value={response.duration} />
          </div>
          
          <label htmlFor="description">Description :</label>
          <textarea disabled id="description" value={response.description} />
          <label htmlFor="file">Fichier :</label>
          <input disabled type="file" id="file"  />
        </form>
        <a
          href="#"
          className="go-back-link"
          onClick={() => window.history.back()}
        >
          Go back
        </a>
      </div>
    </div>
  );
};

export default CourseShow;
