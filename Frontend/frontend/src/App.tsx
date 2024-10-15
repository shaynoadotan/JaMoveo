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

function App() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null); // Track admin status
  const [role, setRole] = useState<'singer' | 'player' | null>(null); // Track user role

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage setIsAdmin={setIsAdmin} />} />
        <Route path="/playersignup" element={<PlayerSignupPage />} />
        <Route path="/adminsignup" element={<AdminSignupPage />} />
        <Route path="/login" element={<LoginPage setIsAdmin={setIsAdmin} setRole={setRole} />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} /> {/* Add Unauthorized page */}

        {/* Protected admin routes */}
        <Route path="/admin" element={<ProtectedRoute isAdmin={!!isAdmin}><AdminPage /></ProtectedRoute>} />
        <Route path="/results" element={<ProtectedRoute isAdmin={!!isAdmin}><ResultsPage /></ProtectedRoute>} />
        
        {/* Pass role to LivePage */}
        <Route path="/live" element={<LivePage isAdmin={!!isAdmin} isSinger={role === 'singer'} role={role!} />} />
        <Route path="/player" element={<PlayerPage />} /> {/* No conditional Navigate here */}
        <Route path="/" element={<SignupPage setIsAdmin={setIsAdmin} />} /> {/* Set initial page */}
      </Routes>
    </Router>
  );
}

export default App;
