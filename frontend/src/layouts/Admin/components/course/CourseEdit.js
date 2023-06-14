import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../../api/axios";


const CourseEdit = () => {
  const { id } = useParams();

  const [title, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Fetch the student data
    axios.get(`http://127.0.0.1:8000/api/admin/courses/show/${id}`)
      .then(response => {
        const studentData = response.data;

        // Update the state variables with the fetched data
        setName(studentData.title);
        setDuration(studentData.duration);
        setCategoryId(studentData.categoryId);
        setDescription(studentData.description);
      })
      .catch(error => {
        console.log(error);
      });

    // Fetch the categories data
    axios.get('/api/categories')
      .then(response => {
        const categoriesData = response.data;
        setCategories(categoriesData);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  const handleCategoryChange = (event) => {
    setCategoryId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a FormData object to send the data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('duration', duration);
    formData.append('description', description);
    formData.append('myVideo', file);

    // Send the updated course data
    axios.post(`http://127.0.0.1:8000/api/admin/courses/edit/${id}`, formData)
      .then(response => {
        setIsSubmitted(true);
        console.log(response.data); // Handle the successful response
      })
      .catch(error => {
        console.log(error);
      });
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
          </div>
          <div className="form-row">
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
              value={title}
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
              <option value="">-- Select an option --</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
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
            <label htmlFor="file">File :</label>
            <input
              type="file"
              id="file"
              onChange={(event) => setFile(event.target.files[0])}
            />
          </div>
          <div className="form-row">
            <button type="submit">Submit</button>
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
