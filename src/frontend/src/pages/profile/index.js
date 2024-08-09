import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/profile`, { withCredentials: true })
      .then(response => {
        setUser(response.data);
      })
      .catch(() => {
        navigate('/login');
      });
  }, [navigate]);

  const handleLogout = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, { withCredentials: true })
      .then(() => {
        navigate('/login');
      });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome, {user.displayName}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;