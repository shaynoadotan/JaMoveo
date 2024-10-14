import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';

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
    <Box component="form" onSubmit={handleSignup} sx={{ padding: 4 }}>
      <Typography variant="h5">Admin Signup</Typography>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <TextField
        label="Instrument"
        variant="outlined"
        fullWidth
        margin="normal"
        value={instrument}
        onChange={(e) => setInstrument(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" fullWidth>Signup</Button>
    </Box>
  );
};

export default AdminSignupPage;
