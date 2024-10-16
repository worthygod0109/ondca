import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('userToken'); // Check authentication status
  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/Admin" />}
    />
  );
};

export default ProtectedRoute;
