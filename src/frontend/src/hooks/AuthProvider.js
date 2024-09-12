import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React from "react";
import { toast } from 'react-toastify';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();

  const loginAction = async (data) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, data)
      if (response) {
        if (response.data.error) {
          toast(response.data.message)
          return;
        } else {
          toast("Ingreso correctamente.")
          setUser(response.data.username);
          setToken(response.data._id);
          localStorage.setItem("site", response._id);
          navigate("/");
          return;
        }

      }
      throw new Error(response.message);
    } catch (err) {
      console.log(err);
      toast.error("Usuario/contraseña incorrectos")
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
