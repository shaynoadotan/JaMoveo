import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth'; // Adjust the path as necessary

dotenv.config();

const app = express();
const server = http.createServer(app); // Correctly create a shared server instance

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('MongoDB connection error:', error));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Your React app URL
    methods: ["GET", "POST"]
  }
});

// Handle socket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for song selection from admin
  socket.on('songSelected', (song) => {
    console.log('Song selected by admin:', song);
    io.emit('songSelected', song);
  });

  // Listen for quit performance event from admin
  socket.on('quitPerformance', () => {
    console.log('Performance ended by admin');
    io.emit('performanceEnded'); // Notify all players that the performance has ended
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Use Auth Routes
app.use('/api', authRoutes);

// Handle Undefined Routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {  // Listen on the server object, not app
  console.log(`Server running on port ${PORT}`);
});
