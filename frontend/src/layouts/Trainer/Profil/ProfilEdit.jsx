import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import useAuth from "../../../hooks/useAuth";
import axios from '../../../api/axios';
import { Last } from 'react-bootstrap/esm/PageItem';
import Course from '../../courses/course';
import './edit.css';
const ProfileEdit = () => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
    "token"
  )}`;
  
  const { auth } = useAuth();
  const username = auth.user;
  console.log(username);


  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  const showNav = () => setAnimationIsFinished(true);

  useLayoutEffect(() => {
    showNav();
  }, [])
  const [state, setState] = useState({
    file: "",
    imagePreviewUrl:
      "",
    firstName: "",
    lastName: "",
    active: "profile"
  });

  const Profile = ({ onSubmit, src, username, lastName }) => (
    <div className="card">
      <form onSubmit={onSubmit}>
        <h1>Profile Card</h1>
        <label className="custom-file-upload fas">
          <div className="img-wrap">
            <img for="photo-upload" src={imagePreviewUrl} alt='click'/>
        
          </div>
        </label>
        <div className="name">{username}</div>
        <div className="lastName">{lastName}</div>
        <button type="submit" className="edit button2">
          Edit Profile{" "}
        </button>
      </form>
    </div>
  );

  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setState({
        ...state,
        file: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  const editFirstName = (e) => {
    const firstName = e.target.value;
    setState({
      ...state,
      firstName
    });
  };

  const editLastName = (e) => {
    const lastName = e.target.value;
    setState({
      ...state,
      lastName
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let activeP = state.active === "edit" ? "profile" : "edit";
    setState({
      ...state,
      active: activeP
    });
    const formData = new FormData();
    formData.append("firstName", state.firstName);
    formData.append("lastName", state.lastName);
    formData.append("profilePicture", state.file);

    // Send PUT request to server
    axios.post('http://127.0.0.1:8000/api/teacher/profile/edit', formData)
      .then(response => {
        // Handle success response
        console.log(response);
      })
      .catch(error => {
        // Handle error response
        console.error(error);
      });
  };

    







  const {imagePreviewUrl, firstName, lastName, active } = state;

  return (
    <div className='body editprofil'>
        <div className="card">
          <label htmlFor="photo-upload" className="custom-file-upload fas">
            <div className="img-wrap img-upload">
              <img  for="photo-upload" alt="alt" src={imagePreviewUrl} />
            </div>
            <input id="photo-upload" type="file" onChange={photoUpload} />
          </label>
          <div className="field">
            <label htmlFor="firstName">firstName:</label>
            <input
              id="firstName"
              type="text"
              maxLength="25"
              placeholder="firstName"
              required
              value={firstName}
              onChange={editFirstName}
            />
          </div>

          <div className="field">
            <label htmlFor="lastName">lastName:</label>
            <input
              id="lastName"
              type="text"
              maxLength="35"
              placeholder="lastName"
              required
              value={lastName}
              onChange={editLastName}
            />
          </div>
          <button type="submit" className="save button2" onClick={handleSubmit}>
            Save{" "}
          </button><a
          href="#"
          className="go-back-link"
          onClick={() => window.history.back()}
          style={{color:"black"}}
        >
          Go back
        </a>
        </div>
        
    </div>
  );

};

export default ProfileEdit;
