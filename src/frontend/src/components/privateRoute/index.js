import React, { useEffect, useState } from 'react';
import {
  useNavigate,
  useLocation,
  Outlet
} from "react-router-dom";
import { isAuthenticated } from '../../services/authService';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await isAuthenticated();
      setAuth(auth);
    };
    checkAuth();
  }, [location.pathname]);

  useEffect(() => {
    if(!auth){
      navigate('/login');
    }
  }, [auth]);

  return (<Outlet />) 
}

export default PrivateRoute;