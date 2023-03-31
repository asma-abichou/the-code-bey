import React from 'react'
import svg from "../dynamique.svg" ;
import "../styles/components/Certificate.css" ;

function Certificat() {
  return (
    <div className='certificat'>
    <img src={svg} />
    <button className="button-53" role="button">Download Your Certificat</button>
    </div>
  )
}

export default Certificat