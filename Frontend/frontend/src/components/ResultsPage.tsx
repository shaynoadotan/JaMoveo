import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { io, Socket } from 'socket.io-client';

// Import JSON data
import heyJudeData from './hey_jude.json';
import veechSheloData from './veech_shelo.json';

interface Song {
  name: string;
  artist: string;
  lines: Array<Array<{ lyrics: string; chords?: string }>>;
}

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('songSelected', (song: Song) => {
      navigate('/live', { state: { song } });
    });

    return () => {
      newSocket.disconnect();
    };
  }, [navigate]);

  const heyJude: Song = {
    name: "Hey Jude",
    artist: "The Beatles",
    lines: heyJudeData
  };

  const veechShelo: Song = {
    name: "Veech Shelo",
    artist: "Unknown",
    lines: veechSheloData
  };

  const selectSong = (song: Song) => {
    if (socket) {
      socket.emit('songSelected', song);
      navigate('/live', { state: { song } });
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5">Search Results</Typography>
      
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h6">{heyJude.name} - {heyJude.artist}</Typography>
        <Button variant="contained" onClick={() => selectSong(heyJude)} sx={{ marginTop: 1 }}>
          Select "{heyJude.name}"
        </Button>
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">{veechShelo.name} - {veechShelo.artist}</Typography>
        <Button variant="contained" onClick={() => selectSong(veechShelo)} sx={{ marginTop: 1 }}>
          Select "{veechShelo.name}"
        </Button>
      </Box>
    </Box>
  );
};

export default ResultsPage;