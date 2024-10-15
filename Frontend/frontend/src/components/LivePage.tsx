import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { io } from 'socket.io-client';
import ChordsLyricsDisplay from './ChordsLyricsDisplay';

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
}

const LivePage: React.FC<LivePageProps> = ({ isAdmin, isSinger }) => {
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

  socket.on('quitPerformance', () => {
    navigate(isAdmin ? '/admin' : '/player');
  });

  // Function to quit live performance (admin only)
  const handleQuit = () => {
    socket.emit('quitPerformance'); // Emit the quit event with admin role
    navigate('/admin'); // Redirect admin to the main page
  };

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
        <ChordsLyricsDisplay data={song.lines} />
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
