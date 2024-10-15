import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { User } from '../App';

interface SignupPageProps {
  setUser: (user: User) => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ setUser }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ textAlign: 'center', padding: 4 }}>
      <Typography variant="h4" gutterBottom>Signup</Typography>
      <Button variant="contained" onClick={() => navigate('/adminsignup')} sx={{ margin: 1 }}>Admin Signup</Button>
      <Button variant="contained" onClick={() => navigate('/playersignup')} sx={{ margin: 1 }}>Player Signup</Button>
      <Button variant="contained" onClick={() => navigate('/login')} sx={{ margin: 1 }}>Login</Button>
    </Box>
  );
};

export default SignupPage;
