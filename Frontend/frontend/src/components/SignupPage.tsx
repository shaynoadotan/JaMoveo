import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage: React.FC<{ setIsAdmin: (isAdmin: boolean) => void }> = ({ setIsAdmin }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Signup</h1>
      <button onClick={() => navigate('/adminsignup')}>Admin Signup</button>
      <button onClick={() => navigate('/playersignup')}>Player Signup</button>
      <button onClick={() => navigate('/login')}>Login</button>
    </div>
  );
};

export default SignupPage;
