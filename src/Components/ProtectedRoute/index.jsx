import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
  const authToken = localStorage.getItem('authToken');

  return authToken ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
