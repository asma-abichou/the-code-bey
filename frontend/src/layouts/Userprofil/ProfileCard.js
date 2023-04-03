import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import "../profile/Card.css";
function ProfileCard() {
  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  const showNav = () => setAnimationIsFinished(true);

  const [name, setName] = useState("your name");
  const [role, setrole] = useState("your role");
  const [about, setAbout] = useState("red3i ba99aa ftwhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
  const [image, setImage] = useState("votre image");


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setImage(URL.createObjectURL(e.target.files[0]));
    };
    reader.readAsDataURL(file);
  }


  useLayoutEffect(() => {
    showNav();
  }, [])
  return (
 <div className="App2">
      <div className='card'>
        <div className='upper-container'>
          <div className='image-container'>
            <img src="logo192.png" alt='' height="100px" width="100px" />
          </div>
        </div>
        <div className='lower-container'>
        <h3> {name}</h3>
        <h4>{role} </h4>
        <p>{about} </p>
        <button >
                    <Link to="/courses">visit courses</Link>
                </button>

      </div>
    </div>
    </div>
  )
}

export default ProfileCard