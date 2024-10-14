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

function App() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // Track admin status
  const [isSinger, setIsSinger] = useState<boolean>(false); // Track singer status (if needed)

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage setIsAdmin={setIsAdmin} />} />
        <Route path="/playersignup" element={<PlayerSignupPage />} />
        <Route path="/adminsignup" element={<AdminSignupPage />} />
        <Route path="/login" element={<LoginPage setIsAdmin={setIsAdmin} />} /> {/* Keep this as-is */}
        <Route path="/player" element={<PlayerPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/live" element={<LivePage isAdmin={isAdmin} isSinger={isSinger} />} /> {/* Pass props */}
        <Route path="/" element={<SignupPage setIsAdmin={setIsAdmin} />} /> {/* Set initial page */}
      </Routes>
    </Router>
  );
}

export default App;
