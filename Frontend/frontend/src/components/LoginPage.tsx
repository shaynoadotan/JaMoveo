import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Modal } from '@mui/material';
import { User } from '../App';

interface LoginPageProps {
  setUser: (user: User | null) => void;
  isLoggedIn: boolean; // New prop to check if the user is logged in
}

const LoginPage: React.FC<LoginPageProps> = ({ setUser, isLoggedIn }) => {
  const [username, setUsernameState] = useState('');
  const [password, setPassword] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      setModalOpen(true); // Open modal if the user is already logged in
    }
  }, [isLoggedIn]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });

      const isAdmin = response.data.user.isAdmin;
      const instrument = response.data.user.instrument;
      setUser({username, isAdmin, instrument}); // Set username on login

      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/player');
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
        Login
      </Button>

      {/* Modal for already logged in */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: 300, 
          bgcolor: 'background.paper', 
          boxShadow: 24, 
          p: 4 }}>
          <Typography variant="h6">You've already logged in</Typography>
          <Button onClick={() => setModalOpen(false)} variant="contained" sx={{ marginTop: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default LoginPage;
