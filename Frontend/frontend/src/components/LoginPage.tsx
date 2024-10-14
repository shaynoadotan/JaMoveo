import React, { useState } from 'react';
import axios from 'axios';

interface LoginPageProps {
  setIsAdmin: (isAdmin: boolean) => void;  // Prop to update admin status in the parent
}

const LoginPage: React.FC<LoginPageProps> = ({ setIsAdmin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });

      // Check if the user is an admin
      setIsAdmin(response.data.user.isAdmin); // Set admin status based on login response
      alert('Login successful!');
    } catch (error) {
      console.error('Login error:', error);
      alert('Error in username or password');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
