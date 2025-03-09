import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// A wrapper for protected routes, which will check authentication and user role
const PrivateRoute = ({ element: Element, requiredRole, user, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        user && requiredRole === user.userType ? (
          <Element />
        ) : user ? (
          <Navigate to={`/${user.userType}-home`} />
        ) : (
          <Navigate to="/signin" />
        )
      }
    />
  );
};

export default PrivateRoute;
