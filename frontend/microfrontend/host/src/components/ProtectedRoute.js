import React from 'react';
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, isLoggedIn, ...props  }) => {
  return (
    <Route exact>
      {
        () => isLoggedIn ? <Component {...props} /> : <Redirect to="./signin" />
      }
    </Route>
)}