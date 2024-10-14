import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { io } from 'socket.io-client';

interface Song {
  name: string;
  artist: string;
  image?: string;
}

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { query } = location.state; // Get the search query passed from AdminPage

  // Example static songs for demonstration
  const songs: Song[] = [
    { name: 'Hey Jude', artist: 'The Beatles', image: 'https://example.com/heyjude.jpg' },
    { name: 'Imagine', artist: 'John Lennon', image: 'https://example.com/imagine.jpg' },
  ].filter(song => song.name.toLowerCase().includes(query.toLowerCase())); // Filter based on query

  const selectSong = (song: Song) => {
    const socket = io('http://localhost:5000'); // Create socket connection
    socket.emit('songSelected', song); // Emit selected song to server

    // Admin navigates to the live page with selected song
    navigate('/live', { state: { song } });
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5">Search Results</Typography>
      {songs.length > 0 ? (
        songs.map((song, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', margin: 2 }}>
            <img src={song.image || 'https://via.placeholder.com/150'} alt={song.name} style={{ width: '50px', marginRight: '10px' }} />
            <Typography variant="body1">{song.name} by {song.artist}</Typography>
            <Button variant="contained" onClick={() => selectSong(song)} sx={{ marginLeft: '10px' }}>Select Song</Button>
          </Box>
        ))
      ) : (
        <Typography>No songs found for your query.</Typography>
      )}
    </Box>
  );
};

export default ResultsPage;
