import React, { useState } from 'react';
import './edit.css';
import { Link, useOutletContext } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import useAuth from "../../hooks/useAuth";
import axios from '../../api/axios';
import { Last } from 'react-bootstrap/esm/PageItem';
import Course from '../courses/course';

const UserProfil = () => {
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
      "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true",
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
            <img for="photo-upload" src={src} />
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

    // Send PUT request to server
    axios.post('http://127.0.0.1:8000/api/student/profile/edit', {
      // Add any relevant data to the request body here


      firstName: state.firstName,
      LastName : state.lastName,
      picture: state.imagePreviewUrl

    })
      .then(response => {
        // Handle success response
        console.log(response);
      })
      .catch(error => {
        // Handle error response
        console.error(error);
      });
  };







  const { imagePreviewUrl, firstName, lastName, active } = state;

  return (
    <div className='body'>
      {active === "edit" ? (
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
              placeholder="Alexa"
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
              placeholder="It's a nice day!"
              required
              value={lastName}
              onChange={editLastName}
            />
          </div>
          <button type="submit" className="save button2" onClick={handleSubmit}>
            Save{" "}
          </button>
        </div>
      ) : (

        <div className="card">

          <h1>Profile Card</h1>
          <label className="custom-file-upload fas">
            <div className="img-wrap">
              <img className='Img' for="photo-upload" src={state.imagePreviewUrl} />
            </div>
          </label>
          <div className="name">{username}</div>
          <div className="lastName">{lastName}</div>
          <button type="submit" className="edit button2" onClick={handleSubmit}>
            Edit Profile{" "}
          </button>
          <Link to="../courses/All">
          <button className="edit button2" >
            My Courses{" "}
          </button>
          </Link>
          
        </div>
      )}
    </div>
  );

};

export default UserProfil;
