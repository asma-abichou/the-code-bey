import React,{useState} from 'react'
import { DefaultPlayer as Video } from 'react-html5video'
import 'react-html5video/dist/styles.css'

const ReactVideoPlayer = (props) => {
    const [model,setModel]=useState(false)
    const {video}=props
  return (
    <Video 
        style={{width:'100%',height:'70vh',margin:'20px'}}
        autoPlay={model}
        controls={['PlayPause','Seek','Time','Volume','Fullscreen']}
    >
        <source src={video} type="video/mp4"/>
    </Video>
  )
}

export default ReactVideoPlayer