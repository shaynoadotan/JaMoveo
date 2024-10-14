import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const LivePage: React.FC = () => {
  const location = useLocation();
  const { song } = location.state; // Get the song passed from ResultsPage

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
