import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

const AdminSignupPage: React.FC<{ setUsername: (username: string) => void }> = ({ setUsername }) => {
  const [username, setUsernameState] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/adminsignup', {
        username,
        password,
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
        onChange={(e) => setUsernameState(e.target.value)}
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
      <Button type="submit" variant="contained" fullWidth>
        Sign Up
      </Button>
    </Box>
  );
};

export default AdminSignupPage;
