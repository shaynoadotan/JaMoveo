import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import PlayerPage from './components/PlayerPage';
import AdminPage from './components/AdminPage';
import ResultsPage from './components/ResultsPage';

function App() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null); // Track admin status

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage setIsAdmin={setIsAdmin} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/player" element={isAdmin === false ? <PlayerPage /> : <Navigate to="/admin" />} />
        <Route path="/admin" element={isAdmin ? <AdminPage /> : <Navigate to="/player" />} />
        <Route path="/results" element={isAdmin ? <ResultsPage /> : <Navigate to="/player" />} />
        <Route path="/" element={<h1>Welcome to JaMoveo</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
