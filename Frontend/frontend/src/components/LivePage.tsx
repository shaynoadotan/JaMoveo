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
  isAdmin: boolean;  // Prop to check if the user is an admin
  isSinger: boolean; // Prop to check if the user is a singer
}

const LivePage: React.FC<LivePageProps> = ({ isAdmin, isSinger }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { song: initialSong } = location.state || { song: null }; // Ensure song is passed from previous page
  const [song, setSong] = useState<Song | null>(initialSong); // State to hold the current song
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollInterval, setScrollInterval] = useState<NodeJS.Timeout | null>(null);
  const socket = io('http://localhost:5000'); // Connect to the server

  // Function to start/stop automatic scrolling
  const toggleScrolling = () => {
    const newScrollingState = !isScrolling;
    setIsScrolling(newScrollingState);
    // Emit scroll start/stop event to all clients
    socket.emit('toggleScrolling', newScrollingState);
  };

  useEffect(() => {
    // Connect to the server and listen for events
    const socketInstance = io('http://localhost:5000'); 

    // Listen for song selection updates from the admin
    socketInstance.on('songSelected', (newSong: Song) => {
      console.log('New song selected:', newSong); // For debugging purposes
      setSong(newSong); // Update state with the new song selected by admin
    });

    // Listen for scrolling toggle from the server
    socketInstance.on('toggleScrolling', (shouldScroll: boolean) => {
      setIsScrolling(shouldScroll);
      if (shouldScroll) {
        // Start scrolling when shouldScroll is true
        const interval = setInterval(() => {
          window.scrollBy(0, 1); // Scroll down 1 pixel
        }, 100); // Adjust speed by changing the delay
        setScrollInterval(interval);
      } else {
        // Stop scrolling when shouldScroll is false
        if (scrollInterval) {
          clearInterval(scrollInterval);
          setScrollInterval(null);
        }
      }
    });

    return () => {
      socketInstance.disconnect(); // Clean up socket connection on unmount
    };
  }, [scrollInterval]); // Add scrollInterval as dependency

  // Function to quit live performance (admin only)
  const handleQuit = () => {
    socket.emit('quitPerformance'); // Emit the quit event to all players
    navigate('/admin'); // Redirect admin and players to the main page
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
          {word.chords ? `${word.chords} ${word.lyrics}` : word.lyrics}
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
        backgroundColor: '#000', // Black background for high contrast
        color: '#fff', // White text for contrast
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

      {/* Floating button to toggle auto-scrolling for both admin and player */}
      <Box sx={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 100 }}>
        <Button
          variant="contained"
          onClick={toggleScrolling}
          sx={{ backgroundColor: isScrolling ? 'red' : 'green' }}
        >
          {isScrolling ? 'Stop Scrolling' : 'Start Scrolling'}
        </Button>
      </Box>

      {/* Quit button (admin only) */}
      {isAdmin && (
        <Box sx={{ position: 'fixed', top: '20px', right: '20px', zIndex: 100 }}>
          <Button variant="contained" color="error" onClick={handleQuit}>
            Quit
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default LivePage;
