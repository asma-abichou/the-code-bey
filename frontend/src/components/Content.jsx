import React, { useLayoutEffect, useRef, useState,useEffect } from 'react';
import { gsap  } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/components/Content.css";
import {Link ,useOutletContext } from "react-router-dom";
import axios from '../api/axios.js';



export default function Content() {
  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  const [open , setOpen] = useState([false,false,false,false,false]);
  const showNav = ()=> setAnimationIsFinished(true) ;
   
  useLayoutEffect(()=>{
    showNav();
    console.log(open);
  },[])
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    axios.get('https://mon-api.com/videos/educatives')
      .then(response => {
        // Récupérer l'URL de la première vidéo de la réponse de l'API
        const firstVideoUrl = response.data[0].url;
        setVideoUrl(firstVideoUrl);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
//   !open[1] && setOpen([
//     ...open.slice(0, 1),
//     true,
//     ...open.slice(2)
//   ])  ;
//   console.log(open);
const handleLearnButtonClick = () => {
  // Naviguer vers la page de lecture vidéo lors du clic sur le bouton "Learn"
  window.location.href = `/lecture-video/${videoUrl}`;
};
return <div className='content'>
            {
            open.map(
                (item,i) =>{ 
                    return(
                    <div key={i} className='chapter'>
                    <div className='top'  onClick={()=>setOpen([
    ...open.slice(0, i),
    !open[i],
    ...open.slice(i+1)
  ])  }>
                    <div className='icon'> <svg viewBox="0 0 16 16" fill="#fff" xmlns="http://www.w3.org/2000/svg" role="img" width="16" height="16" sl-test-data="cmpModule-started-icon-403" class="sol-icon le-module__state-icon le-module__state-icon--started"><g id="icon-play-small"><path id="Vector" d="M4 3.84976C4 3.46852 4.40956 3.22753 4.74282 3.41268L12.2133 7.56292C12.5562 7.75342 12.5562 8.24658 12.2133 8.43708L4.74282 12.5873C4.40956 12.7725 4 12.5315 4 12.1502V3.84976Z" fill="#AC2719"></path></g></svg></div>
                    <div className='title'> title</div>
                    <div className='svg'>
                    <svg className={!open[i] ? "" :"closed" } viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" width="20" height="20" class="sol-icon le-module__dropdown-icon"><g id="icon-chevron-down-thick"><path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M12.0001 14.8788L4.41433 7.29301C4.21906 7.09774 3.90248 7.09774 3.70722 7.29301L2.29301 8.70722C2.09774 8.90248 2.09774 9.21906 2.29301 9.41433L12.0001 19.1214L21.7072 9.41433C21.9025 9.21906 21.9025 8.90248 21.7072 8.70722L20.293 7.29301C20.0977 7.09774 19.7812 7.09774 19.5859 7.29301L12.0001 14.8788Z" fill="currentColor"></path></g></svg>
                    <svg className={open[i] ? "" :"closed" } viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" width="20" height="20" class="sol-icon le-module__dropdown-icon"><g id="icon-chevron-up-thick"><path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M11.9999 9.12121L19.5857 16.707C19.7809 16.9023 20.0975 16.9023 20.2928 16.707L21.707 15.2928C21.9023 15.0975 21.9023 14.7809 21.707 14.5857L11.9999 4.87856L2.29278 14.5857C2.09752 14.7809 2.09752 15.0975 2.29278 15.2928L3.70699 16.707C3.90226 16.9023 4.21884 16.9023 4.4141 16.707L11.9999 9.12121Z" fill="currentColor"></path></g></svg></div>
                    </div>
                   
                     <div className={open[i] ? "lessons" :"closed" }> 
                      
                     {
                      open.map(
                        ()=> <div className='lesson'> 
                              <div className='icon'> <svg viewBox="0 0 16 16" fill="#fff" xmlns="http://www.w3.org/2000/svg" role="img" width="16" height="16" sl-test-data="cmpModule-started-icon-403" class="sol-icon le-module__state-icon le-module__state-icon--started"><g id="icon-play-small"><path id="Vector" d="M4 3.84976C4 3.46852 4.40956 3.22753 4.74282 3.41268L12.2133 7.56292C12.5562 7.75342 12.5562 8.24658 12.2133 8.43708L4.74282 12.5873C4.40956 12.7725 4 12.5315 4 12.1502V3.84976Z" fill="#AC2719"></path></g></svg></div>
                              <p className='text'>Lesson</p>
                              <h4 className='what'>python</h4>
                              <div className='xp'>  
                              300xp
                              </div>
                              <button className='button' onClick={handleLearnButtonClick}>Learn</button>
                             </div>
                     )}
                     </div>
                     <hr  className={!open[i] ? "" :"closed" }/>
                </div>
             )} ) }
          
       </div>
      ;
}

//zi d onClick lel learn