import React, { useState } from 'react';
import axios from 'axios';

interface Song {
    id: string;
    title: string;
    artist: string;
    lyrics?: string; // Optional properties
    chords?: string;
  }
  

const AdminPage: React.FC = () => {
    
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState<Song[]>([]); // This informs TypeScript of the song structure

  const searchSongs = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/songs?query=${query}`);
      setSongs(response.data);
    } catch (error) {
      console.error('Error searching songs:', error);
    }
  };

  const selectSong = (song: any) => {
    // Emit a socket event to notify all players of the selected song
  };

  return (
    <div>
      <h2>Search any song...</h2>
      <form onSubmit={searchSongs}>
        <input
          type="text"
          placeholder="Search for a song"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
  {songs.map((song: Song) => (
    <li key={song.id} onClick={() => selectSong(song)}>
      {song.title} by {song.artist}
    </li>
  ))}
</ul>

    </div>
  );
};

export default AdminPage;
