import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const searchQuery = location.state?.query || ''; // Get the search query from location state
  const [socket, setSocket] = useState<Socket | null>(null);
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]); // State to hold filtered songs

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('songSelected', (song: Song) => {
      // Handle song selection
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const heyJude: Song = {
    name: "Hey Jude",
    artist: "The Beatles",
    lines: heyJudeData,
  };

  const veechShelo: Song = {
    name: "Veech Shelo",
    artist: "Unknown",
    lines: veechSheloData,
  };

  // Function to filter songs based on search query
  const filterSongs = (query: string) => {
    const allSongs = [heyJude, veechShelo];
    return allSongs.filter(song => song.name.toLowerCase().includes(query.toLowerCase()));
  };

  useEffect(() => {
    setFilteredSongs(filterSongs(searchQuery)); // Filter songs based on the search query
  }, [searchQuery]);

  const selectSong = (song: Song) => {
    if (socket) {
      socket.emit('songSelected', song);
      // Navigate to live page with selected song
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5">Search Results</Typography>
      
      {/* Display filtered songs */}
      {filteredSongs.length > 0 ? (
        filteredSongs.map((song, index) => (
          <Box key={index} sx={{ marginTop: 2 }}>
            <Typography variant="h6">{song.name} - {song.artist}</Typography>
            <Button variant="contained" onClick={() => selectSong(song)} sx={{ marginTop: 1 }}>
              Select "{song.name}"
            </Button>
          </Box>
        ))
      ) : (
        <Typography variant="body1" sx={{ marginTop: 2 }}>No songs found.</Typography>
      )}
    </Box>
  );
};

export default ResultsPage;
