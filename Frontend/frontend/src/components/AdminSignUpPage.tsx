import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';

interface AdminSignUpPageProps {
  setUsername: (username: string) => void; // Prop to set the username
}

const AdminSignUpPage: React.FC<AdminSignUpPageProps> = ({ setUsername }) => {
  const [username, setUsernameLocal] = useState('');
  const [password, setPassword] = useState('');
  const [instrument, setInstrument] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/signup', {
        username,
        password,
        instrument,
        isAdmin: true, // Specify that this is an admin signup
        role: 'singer', // Set role to singer
      });
      setUsername(username); // Set the username on successful signup
      alert('Admin account created successfully');
      navigate('/admin'); // Redirect to admin page
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
        onChange={(e) => setUsernameLocal(e.target.value)}
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
      <Button type="submit" variant="contained" fullWidth>
        Sign Up
      </Button>
    </Box>
  );
};

export default AdminSignUpPage;
