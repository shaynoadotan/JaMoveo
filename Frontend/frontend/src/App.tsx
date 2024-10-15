import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import PlayerSignupPage from './components/PlayerSignUpPage';
import AdminSignupPage from './components/AdminSignUpPage';
import PlayerPage from './components/PlayerPage';
import AdminPage from './components/AdminPage';
import ResultsPage from './components/ResultsPage';
import LivePage from './components/LivePage';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import UnauthorizedPage from './components/UnauthorizedPage'; // Import UnauthorizedPage
import Navbar from './components/Navbar'; // Import the Navbar

function App() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null); // Track admin status
  const [role, setRole] = useState<'singer' | 'player' | null>(null); // Track user role
  const [username, setUsername] = useState<string | null>(null); // Track logged-in username

  const handleLogout = () => {
    setIsAdmin(null); // Clear admin status
    setRole(null); // Clear role
    setUsername(null); // Clear username
  };

  return (
    <Router>
      <Navbar username={username} onLogout={handleLogout} /> {/* Add Navbar */}
      <Routes>
        <Route path="/signup" element={<SignupPage setIsAdmin={setIsAdmin} setUsername={setUsername} />} />
        <Route path="/playersignup" element={<PlayerSignupPage setUsername={setUsername} />} />
        <Route path="/adminsignup" element={<AdminSignupPage setUsername={setUsername} />} />
        <Route path="/login" element={<LoginPage setIsAdmin={setIsAdmin} setRole={setRole} setUsername={setUsername} />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} /> {/* Add Unauthorized page */}

        {/* Protected admin routes */}
        <Route path="/admin" element={<ProtectedRoute isAdmin={!!isAdmin}><AdminPage /></ProtectedRoute>} />
        <Route path="/results" element={<ProtectedRoute isAdmin={!!isAdmin}><ResultsPage /></ProtectedRoute>} />
        
        {/* Pass role to LivePage */}
        <Route path="/live" element={<LivePage isAdmin={!!isAdmin} isSinger={role === 'singer'} role={role!} />} />
        <Route path="/player" element={<PlayerPage />} /> {/* No conditional Navigate here */}
        <Route path="/" element={<SignupPage setIsAdmin={setIsAdmin} setUsername={setUsername} />} /> {/* Set initial page */}
      </Routes>
    </Router>
  );
}

export default App;
