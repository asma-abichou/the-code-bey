import React, { useState,useLayoutEffect} from 'react';
import axios from '../../api/axios';
import "./edit.css"
import EditUserProfile from '@sendbird/uikit-react/EditUserProfile';
import { useOutletContext } from 'react-router-dom';

const USER_REGEX= /^[A-z][A-z0-9-_]{3,23}$/;
const NAME_REGEX= /^[a-zA-Z\s]*.{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EML_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;




const UpdateProfile = () => {
  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
    const showNav = () => setAnimationIsFinished(true);

    useLayoutEffect(() => {
        showNav();
    }, [])
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    oldPassword: '',
    image: null
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    setForm({
      ...form,
      image
    });
  };

  

  return (
  <div>
    <EditUserProfile/>
  </div>
      
  );
};

export default UpdateProfile;
