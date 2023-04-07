import React from 'react'
import  { useLayoutEffect } from 'react'
import { useOutletContext } from 'react-router-dom';
import  { Fragment, useState } from 'react'
import { Button,Grid, TextField,MenuItem,Snackbar,InputAdornment, TextareaAutosize,Box,LinearProgress, Typography } from '@mui/material';
import './addcourse.css'
import MuiAlert from '@mui/material/Alert';
import axios from '../../../api/axios';
const Addcourse = () => {

  const sendData = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('period', period);
    formData.append('difficulty', difficulty);
    formData.append('discipline', discipline);
    formData.append('description', description);
    formData.append('file', file);
    
    axios.post('https://example.com/api/courses', formData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }
  

  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  const showNav = () => setAnimationIsFinished(true);

  useLayoutEffect(() => {
      showNav();
  }, [])
  const [name, setName] = useState('');
    const [period, setPeriod] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [discipline, setDiscipline] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState('');

    const handleSubmit = (event) => {
      event.preventDefault();
      sendData();
    };
    
    return (
      <div >

      <div className="form-container box">
        <form className='form2'  onSubmit={handleSubmit}>
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
            <label htmlFor="period">Période :</label>
            <input
              type="text"
              id="period"
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
            />
          </div>
          <div className="form-row">
            <label htmlFor="difficulty">Difficulté :</label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value)}
            >
              <option value="">-- Sélectionner une option --</option>
              <option value="Facile">Facile</option>
              <option value="Moyen">Moyen</option>
              <option value="Difficile">Difficile</option>
            </select>
            <label htmlFor="discipline">Discipline :</label>
            <select
              id="discipline"
              value={discipline}
              onChange={(event) => setDiscipline(event.target.value)}
            >
              <option value="">-- Sélectionner une option --</option>
              <option value="Mathématiques">Dev Web</option>
              <option value="Physique">Dev Mobile</option>
              <option value="Informatique">Intelligence Artificielle</option>
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
            <button type="submit" onClick={sendData}>Soumettre</button>
          </div>
        </form>  
        <a href="#" className="go-back-link" onClick={() => window.history.back()}>
            Go back
  </a>

      </div>
      </div>
    );
  }

   
export default Addcourse