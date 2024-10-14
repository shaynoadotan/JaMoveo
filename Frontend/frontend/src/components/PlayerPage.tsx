import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { io } from 'socket.io-client';

const PlayerPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const socket = io('http://localhost:5000'); // Connect to the Socket.io server

    // Listen for the 'songSelected' event from the admin
    socket.on('songSelected', (song) => {
      console.log('Song received:', song); // For debugging
      // Navigate to the live page with the selected song
      navigate('/live', { state: { song } });
    });

    return () => {
      socket.disconnect(); // Cleanup when the component unmounts
    };
  }, [navigate]);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4">Waiting for the next song...</Typography>
    </Box>
  );
};

export default PlayerPage;
