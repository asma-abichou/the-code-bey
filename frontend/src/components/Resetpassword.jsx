import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
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
    <form onSubmit={handleSubmit}>
        <h3>entre your email</h3>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <button >Submit</button>
    </form>
    </section>
  );
}

export default ForgotPassword;
