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

function App() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null); // Track admin status

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage setIsAdmin={setIsAdmin} />} />
        <Route path="/playersignup" element={<PlayerSignupPage />} />
        <Route path="/adminsignup" element={<AdminSignupPage />} />
        <Route path="/login" element={<LoginPage setIsAdmin={setIsAdmin} />} />
        <Route path="/player" element={isAdmin === false ? <PlayerPage /> : <Navigate to="/admin" />} />
        <Route path="/admin" element={isAdmin ? <AdminPage /> : <Navigate to="/player" />} />
        <Route path="/results" element={isAdmin ? <ResultsPage /> : <Navigate to="/player" />} />
        <Route path="/live" element={<LivePage />} />
        <Route path="/" element={<Navigate to="/signup" />} />
      </Routes>
    </Router>
  );
}

export default App;
