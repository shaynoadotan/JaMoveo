import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isAdmin: boolean;  // Check if the user is admin
  children: React.ReactNode; // Children components to render if access is granted
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAdmin, children }) => {
  if (!isAdmin) {
    return <Navigate to="/unauthorized" />; // Redirect to unauthorized page if not admin
  }

  return <>{children}</>; // Render children if admin
};

export default ProtectedRoute;
