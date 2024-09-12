import React from 'react';
import { useAuth } from "../../hooks/AuthProvider";
import {
  Navigate,
  Outlet
} from "react-router-dom";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute() {
  const auth = useAuth();

  return auth.token ?
    <Outlet /> :
    <Navigate to='/login' />;
}

export default PrivateRoute;