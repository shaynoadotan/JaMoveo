import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { io } from 'socket.io-client';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const socket = io('http://localhost:5000'); // Connect to the Socket.io server

  // Song 1: "Hey Jude" by The Beatles
  const heyJude = {
    name: 'Hey Jude',
    artist: 'The Beatles',
    lines: [
      [
        { lyrics: "Hey" },
        { lyrics: "Jude", chords: "F" },
        { lyrics: "don't" },
        { lyrics: "make" },
        { lyrics: "it" },
        { lyrics: "bad", chords: "C" }
      ],
      [
        { lyrics: "Take" },
        { lyrics: "a" },
        { lyrics: "sad", chords: "C7" },
        { lyrics: "song", chords: "C4/7" },
        { lyrics: "and" },
        { lyrics: "make" },
        { lyrics: "it" },
        { lyrics: "better", chords: "F" }
      ],
      [
        { lyrics: "Remember", chords: "Bb" },
        { lyrics: "to" },
        { lyrics: "let" },
        { lyrics: "her" },
        { lyrics: "into" },
        { lyrics: "your" },
        { lyrics: "heart", chords: "F" }
      ],
      [
        { lyrics: "Then" },
        { lyrics: "you" },
        { lyrics: "can" },
        { lyrics: "start", chords: "C" },
        { lyrics: "to" },
        { lyrics: "make", chords: "C7" },
        { lyrics: "it" },
        { lyrics: "better", chords: "F" }
      ]
    ]
  };

  // Song 2: Hebrew Song (Veech Shelo)
  const veechShelo = {
    name: 'Veech Shelo',
    artist: 'Unknown',
    lines: [
      [
        { lyrics: "ואיך" },
        { lyrics: "שלא", chords: "Em" },
        { lyrics: "אפנה" },
        { lyrics: "לראות", chords: "Em/D" }
      ],
      [
        { lyrics: "תמיד" },
        { lyrics: "איתה", chords: "Cmaj7" },
        { lyrics: "ארצה" },
        { lyrics: "להיות", chords: "G" }
      ],
      [
        { lyrics: "שומרת" },
        { lyrics: "לי", chords: "Em" },
        { lyrics: "היא" },
        { lyrics: "אמונים", chords: "Em/D" }
      ],
      [
        { lyrics: "לא" },
        { lyrics: "מתרוצצת", chords: "Cmaj7" },
        { lyrics: "בגנים", chords: "G" }
      ],
      [
        { lyrics: "ובלילות", chords: "E" },
        { lyrics: "ובלילות", chords: "Em/D" }
      ],
      [
        { lyrics: "עולות" },
        { lyrics: "עולות", chords: "Cmaj7" },
        { lyrics: "בי" },
        { lyrics: "מנגינות", chords: "G" }
      ],
      [
        { lyrics: "וזרם" },
        { lyrics: "דק", chords: "E" },
        { lyrics: "קולח", chords: "Em/D" }
      ],
      [
        { lyrics: "ותפילותי", chords: "Cmaj7" },
        { lyrics: "לרוח" },
        { lyrics: "נענות", chords: "G" }
      ]
    ]
  };

  // Handle song selection
  const selectSong = (song: any) => {
    socket.emit('songSelected', song); // Emit selected song to server
    navigate('/live', { state: { song } }); // Navigate to LivePage
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5">Search Results</Typography>
      
      {/* "Hey Jude" Selection */}
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h6">Hey Jude - The Beatles</Typography>
        <Button variant="contained" onClick={() => selectSong(heyJude)} sx={{ marginTop: 1 }}>
          Select "Hey Jude"
        </Button>
      </Box>

      {/* "Veech Shelo" Selection */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Veech Shelo - Unknown</Typography>
        <Button variant="contained" onClick={() => selectSong(veechShelo)} sx={{ marginTop: 1 }}>
          Select "Veech Shelo"
        </Button>
      </Box>
    </Box>
  );
};

export default ResultsPage;
