import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const PlayerPage: React.FC = () => {
  const [songSelected, setSongSelected] = useState(false);

  useEffect(() => {
    const socket = io('http://localhost:5000');  
    socket.on('songSelected', () => {
      setSongSelected(true);  
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      {songSelected ? <p>Moving to Live Page...</p> : <h2>Waiting for next song...</h2>}
    </div>
  );
};

export default PlayerPage;
