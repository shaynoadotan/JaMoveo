import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
    // Emit event to socket server for live page transition
    alert(`Selected song: ${song.name} by ${song.artist}`);
    navigate('/live', { state: { song } }); // Navigate to live page with selected song
  };

  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {songs.map((song, index) => (
          <li key={index}>
            <img src={song.image || 'https://via.placeholder.com/150'} alt={song.name} />
            <p>{song.name} by {song.artist}</p>
            <button onClick={() => selectSong(song)}>Select Song</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsPage;
