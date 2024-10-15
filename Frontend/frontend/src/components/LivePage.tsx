import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { io } from 'socket.io-client';

interface SongLine {
  lyrics: string;
  chords?: string;
}

interface Song {
  name: string;
  artist: string;
  lines: SongLine[][];
}

interface LivePageProps {
  isAdmin: boolean;
  isSinger: boolean;
  role: 'singer' | 'player'; // Add role to props
}

const LivePage: React.FC<LivePageProps> = ({ isAdmin, isSinger, role }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { song } = location.state || {}; // Ensure song is passed from previous page

  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1); // Speed of scroll
  const [scrollInterval, setScrollInterval] = useState<NodeJS.Timeout | null>(null);
  const socket = io('http://localhost:5000'); // Connect to the server

  socket.on('toggleScrolling', (scroll: boolean) => {
    setIsScrolling(scroll);
  });

  // Function to start/stop automatic scrolling
  const toggleScrolling = () => {
    socket.emit('toggleScrolling', !isScrolling); // Emit scrolling state to all users
  };

  useEffect(() => {
    if (isScrolling) {
      const interval = setInterval(() => {
        window.scrollBy(0, scrollSpeed);
      }, 100);
      setScrollInterval(interval);
    } else if (scrollInterval) {
      clearInterval(scrollInterval);
    }

    return () => {
      if (scrollInterval) clearInterval(scrollInterval);
    };
  }, [isScrolling, scrollSpeed]);

  // Function to quit live performance (admin only)
  const handleQuit = () => {
    socket.emit('quitPerformance', { role: 'admin' }); // Emit the quit event with admin role
    navigate('/admin'); // Redirect admin to the main page
  };

  // Render function for each song line
  const renderSongLine = (line: SongLine[]) => (
    <Box key={line.map((word) => word.lyrics).join(' ')} sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
      {line.map((word, index) => (
        <Typography
          key={index}
          variant="h5"
          sx={{
            fontSize: '2rem',
            color: word.chords ? 'orange' : 'white', // Chords will be orange, lyrics white
            fontWeight: word.chords ? 'bold' : 'normal',
            margin: '0 10px',
          }}
        >
          {isSinger ? word.lyrics : word.chords ? `${word.chords} ${word.lyrics}` : word.lyrics}
        </Typography>
      ))}
    </Box>
  );

  if (!song) {
    return <Typography variant="h4">Waiting for the next song...</Typography>;
  }

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: '#000',
        color: '#fff',
        minHeight: '100vh',
        overflow: 'hidden',
        position: 'relative',
        fontSize: '2rem',
      }}
    >
      <Typography variant="h3" sx={{ textAlign: 'center', marginBottom: '20px' }}>
        {song.name} by {song.artist}
      </Typography>

      {/* Render song lines */}
      <Box sx={{ textAlign: 'center', margin: '20px 0' }}>
        {song.lines.map((line: SongLine[]) => renderSongLine(line))}
      </Box>

      {/* Quit button (admin only) */}
      {isAdmin && (
        <Box sx={{ position: 'fixed', bottom: '60px', right: '20px', zIndex: 100, width: 170 }}>
          <Button sx={{width: 170}} variant="contained" color="error" onClick={handleQuit}>
            Quit
          </Button>
        </Box>
      )}

      {/* Floating button to toggle auto-scrolling */}
      <Box sx={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 100, width: 170 }}>
        <Button
          variant="contained"
          onClick={toggleScrolling}
          sx={{ width: 170, backgroundColor: isScrolling ? 'red' : 'green' }}
        >
          {isScrolling ? 'Stop Scrolling' : 'Start Scrolling'}
        </Button>
      </Box>
    </Box>
  );
};

export default LivePage;
