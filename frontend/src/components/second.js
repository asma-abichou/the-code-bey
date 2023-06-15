import React from 'react'
import "../styles/components/second.css"
import img from "../static/images/hawa3.png"
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
function second() {

  return (
    <div className="exemple" id='videos'>
      <div className='Title'>
        <img src={img} />
        <h1> An Amazing App Can Change Your Daily Life
        </h1>
      </div>
      <div className='block ytbbloc'>
        <div className='box'><h4> TheCodeBey</h4>
          <iframe width="420" height="315" src="https://www.youtube.com/embed/gXkKjqYm70Q?autoplay=1&mute=1"> </iframe>
          
          <p> Laravel</p>
          <a href='https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1'> <SubscriptionsOutlinedIcon style={{color: "crimson"}}> </SubscriptionsOutlinedIcon></a>
        </div>
        <div className='box'><h4> TheCodeBey</h4>
          <iframe width="420" height="315" src="https://www.youtube.com/embed/gXkKjqYm70Q?autoplay=1&mute=1"> </iframe>
          
          <p>Mobile developpment</p>
          <a href='https://www.youtube.com/embed/gXkKjqYm70Q?autoplay=1&mute=1'><SubscriptionsOutlinedIcon style={{color: "crimson"}}></SubscriptionsOutlinedIcon> </a>
        </div>
        <div className='box'><h4> TheCodeBey</h4>
          <iframe width="420" height="315" src="https://www.youtube.com/embed/gXkKjqYm70Q?autoplay=1&mute=1"> </iframe>
          
          <p> Python</p>
          <a href='https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1'> <SubscriptionsOutlinedIcon style={{color: "crimson"}}></SubscriptionsOutlinedIcon></a>
        </div>
       
      </div>
    </div>
  )
}

export default second