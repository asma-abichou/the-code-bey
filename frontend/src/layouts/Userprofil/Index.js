import React, { useState, useEffect } from 'react';
import './edit.css';
import axios from '../../api/axios';
import { Link, useOutletContext } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import img3 from "../../static/images/hawa3.png"

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
  }, []);

  const [state, setState] = useState({
    file: "",
    imagePreviewUrl: "",
    firstName: "",
    lastName: "",
    active: "profile"
  });

  const Profile = ({ onSubmit, src, username, lastName }) => (
    <div className="Card">
      <form onSubmit={onSubmit}>
        <h1>Profile Card</h1>
        <label className="custom-file-upload fas">
          <div className="img-wrap">
            <img htmlFor="photo-upload" src={imagePreviewUrl} alt="Profile" />
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
    formData.append("picture", state.file);

    // Send POST request to server
    axios.post('http://127.0.0.1:8000/api/student/profile/edit', formData)
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

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/student/profile')
      .then(response => {
        const { firstName, lastName, picture } = response.data.user;
        const imageURL = `http://127.0.0.1:8000${picture}`; // Construct the absolute URL
        setState(prevState => ({
          ...prevState,
          firstName,
          lastName,
          imagePreviewUrl: imageURL
        }));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  

  return (
    <div className="body">
      {active === "edit" ? (
        <div className="Card">
          <label htmlFor="photo-upload" className="custom-file-upload fas">
            <div className="img-wrap img-upload">
              <img htmlFor="photo-upload" src={imagePreviewUrl} alt="Profile" />
            </div>
            <input id="photo-upload" type="file" onChange={photoUpload} />
          </label>
          <div className="field">
            <label htmlFor="firstName">firstName:</label>
            <input
              id="firstName"
              type="text"
              maxLength="25"
              placeholder="enter your FirstName"
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
              placeholder="enter your lastName"
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
        <div className="Card">
          <label className="custom-file-upload fas">
            <div className="img-wrap">
              <img className="Img" htmlFor="photo-upload" src={imagePreviewUrl} alt="Profile" />
            </div>
          </label>
          <div className="name">{firstName}</div>
          <div className="lastName">{lastName}</div>
          <button type="submit" className="edit button2 edit-button" onClick={handleSubmit}>
            Edit Profile{" "}
          </button>
          <Link to="/MyCourses">
            <button className="edit button2 edit-button">
              My Courses{" "}
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserProfil;
