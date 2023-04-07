import React, { useState } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import { useLayoutEffect } from 'react';
function ForgotPassword() {

  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
    const showNav = ()=> setAnimationIsFinished(true) ;

	useLayoutEffect(()=>{
		showNav();
	  },[])
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/forgot-password', { email });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
    <form  onSubmit={handleSubmit}>
        <h3 className="Sign reset">entre your email</h3>
      <label>
        Email:
        <input className="reset"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <button className='reset'>Submit</button>
    </form>
    </section>
  );
}

export default ForgotPassword;
