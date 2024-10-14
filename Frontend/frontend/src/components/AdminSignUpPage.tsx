import React, { useState } from 'react';
import axios from 'axios';

const AdminSignupPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [instrument, setInstrument] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/signup', {
        username,
        password,
        instrument,
        isAdmin: true,  // Mark user as admin
      });
      alert('Admin signup successful!');
    } catch (error) {
      console.error('Signup error:', error);
      alert('Error signing up.');
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Admin Signup</h2>
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
        <option value="">Select Instrument</option>
        <option value="Guitar">Guitar</option>
        <option value="Vocals">Vocals</option>
        <option value="Drums">Drums</option>
      </select>
      <button type="submit">Signup</button>
    </form>
  );
};

export default AdminSignupPage;
