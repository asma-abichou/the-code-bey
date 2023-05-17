// import React, { useLayoutEffect,useState,useEffect } from 'react'
// import { useOutletContext,useNavigate } from 'react-router-dom';
// import { useSocket } from '../../context/Socket';

// const Reunion = () => {
//     const[email,setEmail]=useState("");
//     const[roomId,setRoomId]=useState("");
//     // const {socket}=useSocket();
//     const navigate=useNavigate();
//     useEffect(()=>{
//        // socket.on('joined-room')
//     },)
//     const  handleJoinRoom=()=>{
//         navigate('/room/{roomId}')
//          //socket.emit('join-room',{roomId,emailId:email })
//     }
   
//     const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
//   const showNav = () => setAnimationIsFinished(true);
//   useLayoutEffect(() => {
//     showNav();
    
//   }, []);

    

//   return (
//     <div className='homepage-container'>
//     <div className='input-container'>
//         <input  value={email} onChange={e=>setEmail(e.target.value)}type="email" placeholder='Enter your email here ' />
//         <input  value={roomId} onChange={e=>setRoomId(e.target.value)}type="text" placeholder='Enter Room Code ' />
//         <button onClick={handleJoinRoom}>Enter Room</button>
//     </div>
//   </div>)
// }

// export default Reunion