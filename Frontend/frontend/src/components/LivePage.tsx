import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useLocation } from 'react-router-dom';

const LivePage: React.FC = () => {
  const location = useLocation();
  const { song } = location.state;

  useEffect(() => {
    const socket = io('http://localhost:5000'); // Replace with your backend URL
    socket.on('songSelected', (newSong) => {
      alert(`Now playing: ${newSong.name} by ${newSong.artist}`);
      // Update state to reflect new song
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>{song.name} by {song.artist}</h2>
      {/* Display lyrics and chords */}
    </div>
  );
};

export default LivePage;
