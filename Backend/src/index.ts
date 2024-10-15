import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './netlify/functions/api';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('MongoDB connection error:', error));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Handle socket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('songSelected', (song) => {
    io.emit('songSelected', song);
  });

  socket.on('toggleScrolling', (shouldScroll) => {
    io.emit('toggleScrolling', shouldScroll);
  });

  // Emit quitPerformance with role
  socket.on('quitPerformance', (role) => {
    io.emit('quitPerformance', role); // Broadcast the quit event with role to all clients
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
const PORT = process.env.SERVER_PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});