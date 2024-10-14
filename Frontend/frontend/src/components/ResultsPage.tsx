import React, { useState } from 'react';

interface Song {
  name: string;
  artist: string;
  image?: string;
}

const ResultsPage: React.FC = () => {
  const [songs] = useState<Song[]>([
    { name: 'Hey Jude', artist: 'The Beatles', image: 'https://example.com/heyjude.jpg' },
    { name: 'Imagine', artist: 'John Lennon', image: 'https://example.com/imagine.jpg' },
  ]); // Example static data

  const selectSong = (song: Song) => {
    // Emit event to socket server for live page transition
    alert(`${song.name} by ${song.artist} selected!`);
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
