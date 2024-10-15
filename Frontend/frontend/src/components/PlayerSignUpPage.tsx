import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import axios from 'axios';
import { User } from '../App';

interface PlayerSignupPageProps {
  setUser: (user: User) => void;
}

const PlayerSignupPage: React.FC<PlayerSignupPageProps> = ({ setUser }) => {
  const [username, setUsernameState] = useState('');
  const [password, setPassword] = useState('');
  const [instrument, setInstrument] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password || !instrument) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const isAdmin = false;
      await axios.post('http://localhost:5000/api/signup', {
        username,
        password,
        instrument,
        isAdmin, 
        role: "player"
      });
      setUser({username, instrument, isAdmin}); // Set the username on successful signup
      alert('Player account created successfully');
      navigate('/player'); // Redirect to player page
    } catch (error) {
      console.error('Signup error:', error);
      alert('Error during signup');
    }
  };

  return (
    <Box component="form" onSubmit={handleSignup} sx={{ padding: 4 }}>
      <Typography variant="h5">Player Sign Up</Typography>
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
      <FormControl fullWidth>
        <InputLabel id="instrument-select-label">Instrument</InputLabel>
        <Select
          labelId="instrument-select-label"
          id="instrument-select"
          value={instrument}
          label="Instrument"
          onChange={(e) => setInstrument(e.target.value)}
        >
          <MenuItem value="singer">Singer</MenuItem>
          <MenuItem value="guitar">Guitar</MenuItem>
          <MenuItem value="bass">Bass</MenuItem>
          <MenuItem value="drums">Drums</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" fullWidth>
        Sign Up
      </Button>
    </Box>
  );
};

export default PlayerSignupPage;
