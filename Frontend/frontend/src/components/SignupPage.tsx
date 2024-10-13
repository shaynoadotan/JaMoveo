import React, { useState } from 'react';
import axios from 'axios';

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [instrument, setInstrument] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/signup', {
        username,
        password,
        instrument,
      });
      alert('Signup successful!');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <select
        value={instrument}
        onChange={(e) => setInstrument(e.target.value)}
        required
      >
        <option value="" disabled>Select Instrument</option>
        <option value="Guitar">Guitar</option>
        <option value="Vocals">Vocals</option>
        <option value="Drums">Drums</option>
        {/* Add more instruments as needed */}
      </select>
      <button type="submit">Signup</button>
    </form>
  );
};

export default SignupPage;
