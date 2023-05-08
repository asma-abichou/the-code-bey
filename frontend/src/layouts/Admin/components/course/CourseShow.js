import React from "react";
import { useLayoutEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const CourseShow = () => {
  const { id } = useParams();
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
            <input disabled type="text" id="name" value={name} />
            <label htmlFor="duration">Duration :</label>
            <input disabled type="text" id="duration" value={duration} />
          </div>
          <label htmlFor="category">Category :</label>
          <input disabled type="text" id="category" value={category} />
          <label htmlFor="description">Description :</label>
          <textarea disabled id="description" value={description} />
          <label htmlFor="file">Fichier :</label>
          <input disabled type="file" id="file" />
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
