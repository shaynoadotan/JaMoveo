import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import PlayerSignupPage from './components/PlayerSignUpPage';
import AdminSignupPage from './components/AdminSignUpPage';
import PlayerPage from './components/PlayerPage';
import AdminPage from './components/AdminPage';
import ResultsPage from './components/ResultsPage';
import LivePage from './components/LivePage';
import ProtectedRoute from './components/ProtectedRoute';
import UnauthorizedPage from './components/UnauthorizedPage';
import Navbar from './components/Navbar';
import { Modal, Box, Typography, Button } from '@mui/material';

export interface User {
  username: string;
  isAdmin: boolean;
  instrument: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'singer' | 'player' | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
  };

  const isLoggedIn = user != null;

  return (
    <Router>
      <Navbar username={user?.username || null} onLogout={handleLogout} isAdmin={user?.isAdmin === true} />
      <Routes>
        <Route path="/signup" element={
          isLoggedIn ? (
            <Navigate to={role === 'player' ? '/player' : '/admin'} />
          ) : (
            <SignupPage setUser={setUser} />
          )
        } />
        <Route path="/playersignup" element={
          isLoggedIn ? (
            <Navigate to="/player" />
          ) : (
            <PlayerSignupPage setUser={setUser} />
          )
        } />
        <Route path="/adminsignup" element={
          isLoggedIn ? (
            <Navigate to="/admin" />
          ) : (
            <AdminSignupPage setUser={setUser} />
          )
        } />

        <Route path="/login" element={
          isLoggedIn ? (
            <Navigate to={role === 'player' ? '/player' : '/admin'} />
          ) : (
            <LoginPage setUser={setUser} isLoggedIn={isLoggedIn} />
          )
        } />

        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        <Route path="/admin" element={
          isLoggedIn ? (
            <ProtectedRoute isAdmin={!!user?.isAdmin}><AdminPage /></ProtectedRoute>
          ) : (
            <Navigate to="/login" />
          )
        } />
        <Route path="/results" element={
          isLoggedIn ? (
            <ProtectedRoute isAdmin={!!user?.isAdmin}><ResultsPage /></ProtectedRoute>
          ) : (
            <Navigate to="/login" />
          )
        } />
        
        <Route path="/live" element={
          isLoggedIn ? (
            <LivePage isAdmin={!!user?.isAdmin} isSinger={user?.instrument === 'singer'} />
          ) : (
            <Navigate to="/login" />
          )
        } />
        <Route path="/player" element={
          isLoggedIn ? (
            <PlayerPage />
          ) : (
            <Navigate to="/login" />
          )
        } />
        <Route path="/" element={<SignupPage setUser={setUser} />} />
      </Routes>

      {/* Modal for already logged in */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: 300, 
          bgcolor: 'background.paper', 
          boxShadow: 24, 
          p: 4 }}>
          <Typography variant="h6">You've already logged in</Typography>
          <Button onClick={() => setModalOpen(false)} variant="contained" sx={{ marginTop: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </Router>
  );
}

export default App;
