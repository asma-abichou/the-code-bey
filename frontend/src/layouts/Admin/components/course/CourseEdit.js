import React from "react";
import { useLayoutEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const CourseEdit = () => {
  const { id } = useParams();
  // Get authentication token from local storage

  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null); // new state variable
  const [categories, setCategories] = useState([]);

  const [isSubmitted, setIsSubmitted] = useState(false); // new state variable
  const handleCategoryChange=(event)=>{
    setCategoryId(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a FormData object to send the data
    const formData = new FormData();
    formData.append('title', name);
    formData.append('duration', duration);
    formData.append('description', description);
    formData.append('myVideo', file);
    setIsSubmitted(true);
  };

  return (
    <div>
      <div
        className="addcourse form-container box"
        style={{ backgroundColor: "transparent", color: "black" }}
      >
          <form
            className="form2"
            onSubmit={handleSubmit}
            style={{ color: "black" }}
          >
            <div className="form-title">
              <h1 className="Sign">Edit Course</h1>
            </div><div className="form-row">
            <label htmlFor="id">ID :</label>
              <input
                disabled
                type="text"
                id="id"
                value={id}
              />
              <label htmlFor="name">Title :</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <label htmlFor="duration">Duration :</label>
              <input
                type="text"
                id="duration"
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
              />
            </div>
            <div className="form-row">
          <label htmlFor="category">Category :</label>
          <select
            id="category"
            value={categoryId}
            onChange={handleCategoryChange}
          >
            <option value="">-- Sélectionner une option --</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
               { console.log( "hdbhf option",category.id)}
              </option>
            ))}
          </select>
        </div>
            <div className="form-row">
              <label htmlFor="description">Description :</label>
              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className="form-row">
              <label htmlFor="file">Fichier :</label>
              <input
                type="file"
                id="file"
                onChange={(event) => setFile(event.target.files[0])}
              />
            </div>

            <div className="form-row">
              <button type="submit">Soumettre</button>
            </div>
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

export default CourseEdit;
