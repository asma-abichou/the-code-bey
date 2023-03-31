import React ,{ useLayoutEffect ,useRef ,useState} from 'react'
import "../styles/layouts/body.css" ;
import svg from "../test.svg" ;
import { gsap} from "gsap";
import { Draggable } from 'gsap/all'
import { Link ,useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Body({auth}) {
  console.log("body : outside ule / "+auth?.user );
  const [authenticated , setAuth] = useState();
  const navigate = useNavigate();
    const [size, setSize] = useState([0, 0]);
    const updateSize = ()=> {
      console.log([window.innerWidth, window.innerHeight]);
            if( window.innerWidth - 950 < 150 && window.innerWidth - 950 > -150 ) {
              console.log("wssel");
              window.location.reload(true);
            }
          }
    const body = useRef();
    const btl = useRef() ;
    gsap.registerPlugin(Draggable);
    const [pos , setPos] = useState({ x:0, y:0 });
  useLayoutEffect(() => {
    console.log("body : inside ule / "+auth?.user );
    setAuth(auth);
    window.addEventListener('resize', updateSize); 
    let ctx = gsap.context(()=>{
        // let pos = { x:0, y:0 }
////////////////
//950
  btl.current && btl.current.progress(0).kill();
//   let { isDesktop, isMobile } = context.conditions ;
 let mm = gsap.matchMedia() ;
      
 mm.add("(min-width: 950px)", () => {
 // desktop setup code here...
 btl.current =  gsap.timeline()
    .set(".face", { // apply transforms to each face of the cube desktop version
      rotateY: (i) => [0,90,180,270,0,0][i],
      rotateX: (i) => [0,0,0,0,90,-90][i],
      transformOrigin: "50% 50% -149px",
      z: 90,
      
    })
    .set("#dragger", { opacity:0 }) // make the drag layer invisible
    .set("#cube",    { rotationX:-45, rotationY:-25 }).from(" .title",  {
      duration  : 1 ,
      opacity: 0,
      x: 200,
      ease: "easeInOut" ,
    }).from("#bodyland",  {
            duration : 1 ,
            opacity: 0,
            y: -200,
            ease: "easeInOut"
          } ).from(".description",  {
      duration : 1 ,
      opacity: 0,
      x: 200,
      ease: "easeInOut"
    } ).from(".face",  {
      duration : 1.8 ,
      opacity: 0,
      stagger : 0.3 ,
      ease: "easeInOut"
      
    } ).from(".svg",  {
      duration : 1.8 ,
      opacity: 0,
      stagger : 0.3 ,
      ease: "easeInOut"
      
    } );// set initial cube position
    
  });

mm.add("(max-width: 949px)", () => {
 // mobile setup code here...
 btl.current =  gsap.timeline()
    .set(".face", { // apply transforms to each face of the cube mobile version 
        rotateY: (i) => [0,90,180,270,0,0][i],
        rotateX: (i) => [0,0,0,0,90,-90][i],
        transformOrigin: "50% 50% -70px",
        z: 12,
        
      })
    .set("#dragger", { opacity:0 }) // make the drag layer invisible
    .set("#cube",    { rotationX:-45, rotationY:-25 }).from(" .title",  {
            duration  : 1 ,
            opacity: 0,
            x: 200,
            ease: "easeInOut" ,
        }).from("#bodyland",  {
            duration : 0.3 ,
            opacity: 0,
            y: -200,
            ease: "easeInOut"
          } ).from(" .description",  {
            duration : 1 ,
            opacity: 0,
            x: 200,
            ease: "easeInOut"
          } ).from(".face",  {
            duration : 1.8 ,
            opacity: 0,
            stagger : 0.3 ,
            ease: "easeInOut"
            
          } ).from(".svg",  {
            duration : 1.2 ,
            opacity: 0,
            stagger : 0.2 ,
            ease: "easeInOut"
            
          } )  ;// set initial cube position
    
});

Draggable.create("#dragger",{
  
    onDragStart:(e)=>{ 
      if (e.touches) {// on mobile, convert the touch x/y
        e.clientX = e.touches[0].clientX;
        e.clientY = e.touches[0].clientY;            
      }
      pos.x = Math.round(e.clientX);
      pos.y = Math.round(e.clientY);
    },
    
    onDrag:(e)=>{
      if (e.touches) {// on mobile, convert the touch x/y
        e.clientX = e.touches[0].clientX;
        e.clientY = e.touches[0].clientY;            
      }
      
      let ry = Math.abs(gsap.getProperty("#cube", 'rotationY')%360),
          rxDir = (ry>90 && ry<270) ? '+=':'-='; // feels more intuitive to invert rotationX when "cube" is turned backwards
      console.log(rxDir + ( Math.round(e.clientY)-pos.y ));
      console.log(ry);
      gsap.to("#cube", {
        rotationX: rxDir + ( Math.round(e.clientY)-pos.y ),
        rotationY: '+=' + ( (Math.round(e.clientX)-pos.x)%360 )
      });
  
      pos.x = Math.round(e.clientX);
      pos.y = Math.round(e.clientY);
    },
    
    onDragEnd:()=> gsap.set("#dragger", {x:0, y:0}) // reset drag layer
  
    
  
  }) ;
  
        // let rots = [ 
        //     { ry: 0,   rx: 0  }, // 1
        //     { ry: 90,  rx: 0  }, // 2
        //     { ry: 180, rx: 0  }, // 3
        //     { ry: 270, rx: 0  }, // 4
        //     { ry: 0,   rx: 90 }, // 5
        //     { ry: 0,   rx:-90 }  // 6
        //   ];
        //   gsap.set(".face", { // apply transform rotations to each face of the cube
        //     rotateY: (i) => rots[i].ry,
        //     rotateX: (i) => rots[i].rx,
        //     transformOrigin: "50% 50% -250px",
        //     z: 150,
            
        //   });
        //       btl.current && btl.current.progress(0).kill();
        //       btl.current =   gsap.timeline({ repeat: -1, defaults: { duration: 4, ease: "easeInOut" } })
        //       .to("#cube", { rotateX: 0,  rotateY: -90  })
        //       .to("#cube", { rotateX: 0,  rotateY: -180 })
        //       .to("#cube", { rotateX: 0,  rotateY: -270 })
        //       .to("#cube", { rotateX:-90, rotateY: -360 })
        //       .to("#cube", { rotateX: 90, rotateY: -360 })
        //       .to("#cube", { rotateX: 0,  rotateY: -360 }) ; // short rotation back to 1
    /////////////
    
       } ,body);

    // mm.add({
    //     // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
    //     isDesktop : `(min-width: ${breakPoint}px)`,
    //     isMobile : `(max-width: ${breakPoint - 1}px)`
    //   },  context )
      

              
    // ctx.add(context) ;

        // let pos = { x:0, y:0 }
    console.log("refreched")
       
    return ()=> {
       
        window.removeEventListener('resize', updateSize);
        ctx.revert();
} 
      }, [auth,size]);
       // short rotation back to 1

  return (
    <div id="bodyland" ref={body}>
        <h1 className='title'>
        TheCodeBey
        </h1>
        <h5 className='description'>
        An Amazing Coding experience <br/>that Can Change Your Programmer Life . 
        <br/> discover the cube to dicover our services .
        </h5>
    <div id='playground'>
    <div className="containe">
    <div id="cube">
        <div className="face">
            <div className="svg">
            <img src={svg}/>

        </div>
         <p className='caption'> 
         COURSES
         </p>
        </div>
        <div className="face">
            <div className="svg">
            <img src={svg}/>

        </div>
         <p className='caption'> 
         TUTOLRIALS
         </p>
        </div>
        <div className="face">
            <div className="svg">
            <img src={svg}/>

        </div>
         <p className='caption'> 
      liveStream
         </p>
        </div>
        <div className="face">
            <div className="svg">
            <img src={svg}/>

        </div>
         <p className='caption'> 
         FORUMS
         </p>
        </div>
        <div className="face">
            <div className="svg">
            <img src={svg}/>

        </div>
         <p className='caption'> 
         BLOGS
         </p>
        </div>
        <div className="face">
            <div className="svg">
            <img src={svg}/>

        </div>
         <p className='caption'> 
         STREAMING
         </p>
        </div>
       
    </div>

 </div>
  <div id="dragger">
  </div>
    </div>
    <div className='buttons'>
    { authenticated?.user ? <p> welcome {auth.user} </p>  :
       <>
       <button id="login" onClick={()=>navigate("/login", { replace: true })} className='grid-item'> <Link to="login">Login</Link> </button>
      <button onClick={()=>navigate("/register", { replace: true })} className='grid-item'> <Link to="register">Register</Link> </button>
       </>
      
    }
     
      {/* <button className='grid-item'> <a href='https://www.friv.com/'>play</a> </button> */}
    </div>

    </div>
  )
}

export default Body