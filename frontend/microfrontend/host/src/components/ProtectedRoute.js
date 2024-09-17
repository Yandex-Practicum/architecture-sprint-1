import React, { Suspense } from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route exact>
      <Suspense fallback={<div>Loading... </div>}>
        {
          () => props.loggedIn ? <Component {...props} /> : <Redirect to="./signin" />
        }
      </Suspense>
    </Route>
  )
}

export default ProtectedRoute;
