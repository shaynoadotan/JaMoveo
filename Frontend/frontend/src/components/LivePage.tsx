import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

interface Song {
    id: string;
    title: string;
    artist: string;
    lyrics?: string; // Optional properties
    chords?: string;
  }
  

const LivePage: React.FC = () => {
    const [song, setSong] = useState<Song | null>(null); // The song can be null initially

  useEffect(() => {
    const socket = io('http://localhost:5000');
    socket.on('songSelected', (songData) => {
      setSong(songData);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      {song ? (
        <div>
          <h2>{song.title}</h2>
          <h3>By {song.artist}</h3>
          {/* Display chords and lyrics */}
        </div>
      ) : (
        <h2>Waiting for next song...</h2>
      )}
    </div>
  );
  
};

export default LivePage;
