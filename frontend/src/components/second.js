import React from 'react'
import "../styles/components/second.css"

function second() {

  return (
    <div className="exemple" id='videos'>
      <div className='Title'>
        <img src='logo192.png' />
        <h1> An Amazing App Can Change Your Daily Life
        </h1>
      </div>
      <div className='block'>
        <div className='box'>
          <iframe width="420" height="315" src="https://www.youtube.com/embed/gXkKjqYm70Q?autoplay=1&mute=1"> </iframe>
          <h4> TheCodeBey</h4>
          <p> Laravel</p>
          <a href='https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1'> go to youtube  </a>
        </div>
        <div className='box'>
          <iframe width="420" height="315" src="https://www.youtube.com/embed/gXkKjqYm70Q?autoplay=1&mute=1"> </iframe>
          <h4> TheCodeBey</h4>
          <p>Mobile developpment</p>
          <a href='https://www.youtube.com/embed/gXkKjqYm70Q?autoplay=1&mute=1'> go to youtube  </a>
        </div>
        <div className='box'>
          <iframe width="420" height="315" src="https://www.youtube.com/embed/gXkKjqYm70Q?autoplay=1&mute=1"> </iframe>
          <h4> TheCodeBey</h4>
          <p> python</p>
          <a href='https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1'> go to youtube  </a>
        </div>
      </div>
    </div>
  )
}

export default second