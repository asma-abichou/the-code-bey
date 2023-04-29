 import React from 'react'
import  { useLayoutEffect } from 'react'
import { useOutletContext, useParams } from 'react-router-dom';
import  {  useState,useEffect } from 'react'

import './addcourse.css'
import MuiAlert from '@mui/material/Alert';
import axios from '../../../api/axios';
const AddCourse = () => {
  

  
   // Get authentication token from local storage
  

   // Add the token to request headers
   axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  const showNav = () => setAnimationIsFinished(true);
  useLayoutEffect(() => {
    showNav();
  }, []);

  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false); // new state variable
  const [categories, setCategories] = useState([]);
const handleCategoryChange=(event)=>{
  setCategoryId(event.target.value)
}
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/category", {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        setCategories(response.data);
        console.log(response);
       
      })
      .catch((error) => {
        console.error(error);
      });
    
  }, []);
  
 
  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a FormData object to send the data
    const formData = new FormData();
    formData.append('title', name);
    formData.append('duration', duration);
    formData.append('description', description);
    formData.append('myVideo', file);
    setIsSubmitted(true); 

   axios.post(`http://127.0.0.1:8000/api/course/${categoryId}`, formData,
   {headers: {
    'Content-Type': 'multipart/form-data'
  }})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.log(error);
      });
  };

  return (
    <div>
      <div className="addcourse form-container box">
        
        {isSubmitted ? ( // render success message if the form is successfully submitted
          <div className="success-message">
            Course added successfully!
          </div>
        ) : (
          <form className='form2' onSubmit={handleSubmit}>
            <div className="form-title">
              <h1>Add Course</h1>
            </div>
            <div className="form-row">
              <label htmlFor="name">Titre :</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <label htmlFor="duration">duration :</label>
              <input
                type="text"
                id="duration"
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
              />
            </div>
            <div className="form-row">
          <label htmlFor="category">category :</label>
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
        )}
        <a href="#" className="go-back-link" onClick={() => window.history.back()}>
          Go back
        </a>
      </div>
    </div>
  );
};
   
export default AddCourse;