import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import axios from 'axios';

const AdminSignUpPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [instrument, setInstrument] = useState('');
  const [role, setRole] = useState('singer'); // Default role

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/signup', {
        username,
        password,
        instrument,
        isAdmin: true, // This is an admin signup
        role // Add role to the signup request
      });
      alert('Admin account created successfully');
    } catch (error) {
      console.error('Signup error:', error);
      alert('Error during signup');
    }
  };

  return (
    <Box component="form" onSubmit={handleSignup} sx={{ padding: 4 }}>
      <Typography variant="h5">Admin Sign Up</Typography>
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

      <RadioGroup value={role} onChange={(e) => setRole(e.target.value)}>
        <FormControlLabel value="singer" control={<Radio />} label="Singer" />
        <FormControlLabel value="player" control={<Radio />} label="Player" />
      </RadioGroup>

      <Button type="submit" variant="contained" fullWidth>
        Sign Up
      </Button>
    </Box>
  );
};

export default AdminSignUpPage;
