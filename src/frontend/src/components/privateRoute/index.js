import React, {useState} from 'react';
import {
    Navigate,
    Outlet
  } from "react-router-dom";
import { isAuthenticated } from '../../services/authService';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute() {
    const [auth, setAuth] = useState(isAuthenticated());

    return auth ? 
        <Outlet />:
        <Navigate to='/login' />;
}

export default PrivateRoute;