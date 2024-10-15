import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';

interface LoginPageProps {
  setIsAdmin: (isAdmin: boolean) => void;  // Prop to set admin status in the parent
  setRole: (role: 'singer' | 'player') => void; // Prop to set the user role
}

const LoginPage: React.FC<LoginPageProps> = ({ setIsAdmin, setRole }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });

      const { isAdmin, role } = response.data.user; // Extract role from response
      setIsAdmin(isAdmin); // Set admin status based on login response
      setRole(role); // Set user role based on login response

      // Navigate to the appropriate page based on admin status
      if (isAdmin) {
        navigate('/admin');  // Admin dashboard
      } else {
        navigate('/player'); // Player dashboard
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Error in username or password');
    }
  };

  return (
    <Box component="form" onSubmit={handleLogin} sx={{ padding: 4 }}>
      <Typography variant="h5">Login</Typography>
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
      <Button type="submit" variant="contained" fullWidth>Login</Button>
    </Box>
  );
};

export default LoginPage;
