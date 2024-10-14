import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage';
// import { PlayerPage } from './components/PlayerPage';
import LivePage from './components/LivePage';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/admin">Admin</Link></li>
            <li><Link to="/player">Player</Link></li>
            <li><Link to="/live">Live</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          {/* <Route path="/player" element={<PlayerPage />} /> */}
          <Route path="/live" element={<LivePage />} />
          <Route path="/" element={
            <>
              <h1>Welcome to JaMoveo</h1>
              <p>Select a page from the navigation.</p>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
