import React, { useState } from 'react';
import './edit.css';
import { useOutletContext } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import useAuth from "../../hooks/useAuth";

const UserProfil = () => {
  const { auth } = useAuth();
  const username = auth.user;
    console.log(username);
  

    const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
    const showNav = ()=> setAnimationIsFinished(true) ;
     
    useLayoutEffect(()=>{
      showNav();
    },[])
    const [state, setState] = useState({
      file: "",
      imagePreviewUrl:
        "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true",
      name: "",
      status: "",
      active: "edit"
    });
    const Edit = ({ onSubmit, children }) => (
        <div className="card">
          <form onSubmit={onSubmit}>
            {children}
            <button type="submit" className="save button2 ">
              Save{" "}
            </button>
          </form>
        </div>
      );
      const ImgUpload = ({ onChange, src }) => (
        <label htmlFor="photo-upload" className="custom-file-upload fas">
          <div className="img-wrap img-upload">
            <img for="photo-upload" src={src} />
          </div>
          <input id="photo-upload" type="file" onChange={onChange} />
        </label>
      );
      const Name = () => (
        <div className="field">
          <label htmlFor="name">name:</label>
          <input
            id="name"
            type="text"
            maxlength="25"
            placeholder="Alexa"
            required
          />
        </div>
      );
      const Status = () => (
        <div className="field">
          <label htmlFor="status">status:</label>
          <input
            id="status"
            type="text"
            maxLength="35"
            placeholder="It's a nice day!"
            required
          />
        </div>
      );
      const Profile = ({ onSubmit, src, username, status }) => (
        <div className="card">
          <form onSubmit={onSubmit}>
            <h1>Profile Card</h1>
            <label className="custom-file-upload fas">
              <div className="img-wrap">
                <img for="photo-upload" src={src} />
              </div>
            </label>
            <div className="name">{username}</div>
            <div className="status">{status}</div>
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
  
    const editName = (e) => {
      const name = e.target.value;
      setState({
        ...state,
        name
      });
    };
  
    const editStatus = (e) => {
      const status = e.target.value;
      setState({
        ...state,
        status
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      let activeP = state.active === "edit" ? "profile" : "edit";
      setState({
        ...state,
        active: activeP
      });
    };
  
    const { imagePreviewUrl, name, status, active } = state;
  
    return (
      <div className='body'>
        {active === "profile" ? (
          <Edit onSubmit={handleSubmit}>
            <ImgUpload onChange={photoUpload} src={imagePreviewUrl} />
            <Name onChange={editName} value={name} />
            <Status onChange={editStatus} value={status} />
            
          </Edit>
        ) : (
          <Profile
            onSubmit={handleSubmit}
            src={imagePreviewUrl}
            name={username}
            status={status}
            
          >
           
            </Profile>
        )}
      </div>
    );
    
  };
  
  export default UserProfil;
  