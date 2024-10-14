import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { io } from 'socket.io-client';

const LivePage: React.FC = () => {
  const location = useLocation();
  const { song: initialSong } = location.state || { song: null }; // Handle case where song is not provided
  const [song, setSong] = useState(initialSong); // State to hold the current song

  useEffect(() => {
    const socket = io('http://localhost:5000'); // Replace with your backend URL

    // Listen for song selection updates from the admin
    socket.on('songSelected', (newSong) => {
      console.log('New song selected:', newSong); // For debugging purposes
      setSong(newSong); // Update state with the new song selected by admin
    });

    return () => {
      socket.disconnect(); // Clean up socket connection on unmount
    };
  }, []);

  if (!song) {
    return <Typography variant="h4">Waiting for the next song...</Typography>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4">{song.name} by {song.artist}</Typography>
      {/* Display lyrics and chords */}
      <Typography variant="body1">Lyrics...</Typography>
      <Typography variant="body1">Chords...</Typography>
    </Box>
  );
};

export default LivePage;
