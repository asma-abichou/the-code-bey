import React, { useState } from 'react';
import axios from '../../api/axios';
import "./edit.css"

const USER_REGEX= /^[A-z][A-z0-9-_]{3,23}$/;
const NAME_REGEX= /^[a-zA-Z\s]*.{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EML_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



const UpdateProfile = () => {
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
    <section>
      <h2  className="Sign">Edit Profile</h2>
      <div className="avatar-container">
  {form.image ?
    <img src={URL.createObjectURL(form.image)} alt="Profile" className="avatar2" /> :
    <img src="/path/to/profile-image.png" alt="Profile" className="avatar2" />}
  <label className="avatar-label">
 
    <input type="file" accept="image/*" onChange={handleImageChange} className="avatar-input" />
  </label>
</div>

      <form onSubmit={handleSubmit}>
       
        <br />
        <label>
          Nouveau nom:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Email: <br />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        
        <label>
          Mot de passe:
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Confirmer le mot de passe:
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Ancien mot de passe:
          <input
            type="password"
            name="oldPassword"
            value={form.oldPassword}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Soumettre</button>
      </form>
    </section>
  );
};

export default UpdateProfile;
