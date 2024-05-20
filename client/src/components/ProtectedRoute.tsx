import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');


  const isAuthenticated = () => {
    if (!token) {
      console.log('no token found');
      return false;
    }
    return true;
  };

  return isAuthenticated() ? (
    <>
      {children}
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
