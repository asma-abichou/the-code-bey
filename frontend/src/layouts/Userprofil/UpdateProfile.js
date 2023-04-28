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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Vérifier les entrées utilisateur
    if (!USER_REGEX.test(form.name)) {
      alert('Nom invalide');
      return;
    }
    if (!EML_REGEX.test(form.email)) {
      alert('Email invalide');
      return;
    }
    if (!PWD_REGEX.test(form.password)) {
      alert('Mot de passe invalide');
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    // Envoyer les données à l'API avec Axios
    axios.post('/api/profile', form)
      .then((response) => {
        console.log(response);
        alert('Profil mis à jour avec succès');
      })
      .catch((error) => {
        console.log(error);
        alert('Erreur lors de la mise à jour du profil');
      });
  };

  return (
  <div>
    <EditUserProfile/>
  </div>
      
  );
};

export default UpdateProfile;
