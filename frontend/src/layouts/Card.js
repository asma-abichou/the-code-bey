import React from 'react'
import './card.css'
import {Routes, Route, useNavigate} from 'react-router-dom';

const Card = (props) => {
    const navigate = useNavigate();
    const {title,imageUrl,body} = props

    const navigatevid = () => {
        
      
        navigate(`${title}`);
      };
      const subscribe=()=>{
        console.log("subscribe")
      }
    
  
  return (
    <div className='card-container'>
        <div className='image-container'>
          <img src={imageUrl}alt=''/>
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
        <button onClick={subscribe}>
                <a>
                   Subscribe 
                </a>
            </button>
            <button onClick={navigatevid}>
                <a>
                   view more 
                </a>
            </button>
            

        </div>

    </div>
  )
}

export default Card