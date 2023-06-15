import React from 'react';
import './card.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import 'react-toastify/dist/ReactToastify.css';

const Card = (props) => {
  const navigate = useNavigate();
  const { title, imageUrl, body, id, subscribed } = props;

  const navigatevid = () => {
    navigate(`${id}`);
  };

  const subscribe = () => {
    console.log(id);
    axios
      .post('http://127.0.0.1:8000/api/student/subscribe', { id }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        toast(response.data.message); // Display toast notification with the response message
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='card-container'>
      <div className='image-container'>
        <img src={imageUrl} alt='' />
      </div>
      <div className='card-content'>
        <div className='card-title'>
          <h3>{title}</h3>
        </div>
        <div className='card-body'>
          <p>{body}</p>
        </div>
      </div>
      <div className='buttn'>
        {!subscribed ? (
          <button onClick={subscribe} >
            <a className='Sign'>Subscribe</a>
          </button>
        ) : (
          <></>
        )}
        <button onClick={navigatevid} className>
          <a className='Sign'>view more</a>
         
        </button>

      </div>
     
    </div>
  );
};

export default Card;
