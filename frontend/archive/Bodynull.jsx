import React ,{ useLayoutEffect ,useRef} from 'react'
import "../styles/layouts/body.css" ;
import svg from "../test.svg" ;
import { gsap } from "gsap";

function Body() {

    const body = useRef();
    const btl = useRef() ;

  useLayoutEffect(() => {
    
       const ctx = gsap.context(() => {
        let rots = [ 
            { ry: 0,   rx: 0  }, // 1
            { ry: 90,  rx: 0  }, // 2
            { ry: 180, rx: 0  }, // 3
            { ry: 270, rx: 0  }, // 4
            { ry: 0,   rx: 90 }, // 5
            { ry: 0,   rx:-90 }  // 6
          ];
          gsap.set(".face", { // apply transform rotations to each face of the cube
            rotateY: (i) => rots[i].ry,
            rotateX: (i) => rots[i].rx,
            transformOrigin: "50% 50% -250px",
            z: 150,
            
          });
              btl.current && btl.current.progress(0).kill();
              btl.current =   gsap.timeline({ repeat: -1, defaults: { duration: 4, ease: "easeInOut" } })
              .to("#cube", { rotateX: 0,  rotateY: -90  })
              .to("#cube", { rotateX: 0,  rotateY: -180 })
              .to("#cube", { rotateX: 0,  rotateY: -270 })
              .to("#cube", { rotateX:-90, rotateY: -360 })
              .to("#cube", { rotateX: 90, rotateY: -360 })
              .to("#cube", { rotateX: 0,  rotateY: -360 }) ; // short rotation back to 1
            }, body);


            return () => ctx.revert();
     
   
       
      }, []);
    

    
     
      
       // short rotation back to 1

  return (
    <div id="bodyland" ref={body}>
        <h1 className='title'>
        TheCodeBey
        </h1>
        <h5 className='description'>
        An Amazing Coding experience that Can Change Your Programmer Life
        </h5>

           
      

        <div className="containe">
    <div id="cube">
        <div className="face">
            <div className="svg">
            <img src={svg}/>

        </div>
         <p className='caption'> 
         loremipsum dolor sit hamet em cozdoghli fi banan oooo ya safaxia berou7 wel dam m3a el jam3iya
         </p>
        </div>
        <div className="face">
            <div className="svg">
            <img src={svg}/>

        </div>
         <p className='caption'> 
         loremipsum dolor sit hamet em cozdoghli fi banan oooo ya safaxia berou7 wel dam m3a el jam3iya
         </p>
        </div>
        <div className="face">
            <div className="svg">
            <img src={svg}/>

        </div>
         <p className='caption'> 
         loremipsum dolor sit hamet em cozdoghli fi banan oooo ya safaxia berou7 wel dam m3a el jam3iya
         </p>
        </div>
        <div className="face">
            <div className="svg">
            <img src={svg}/>

        </div>
         <p className='caption'> 
         loremipsum dolor sit hamet em cozdoghli fi banan oooo ya safaxia berou7 wel dam m3a el jam3iya
         </p>
        </div>
        <div className="face">
            <div className="svg">
            <img src={svg}/>

        </div>
         <p className='caption'> 
         loremipsum dolor sit hamet em cozdoghli fi banan oooo ya safaxia berou7 wel dam m3a el jam3iya
         </p>
        </div>
        <div className="face">
            <div className="svg">
            <img src={svg}/>

        </div>
         <p className='caption'> 
         loremipsum dolor sit hamet em cozdoghli fi banan oooo ya safaxia berou7 wel dam m3a el jam3iya
         </p>
        </div>
    </div>
</div>
        
    </div>
  )
}

export default Body