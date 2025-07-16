import React, { createContext, useContext, useState, useEffect } from "react";

export const authDataContext = createContext();

export const useAuth = () => useContext(authDataContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const login = (token) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  const serverUrl = "http://localhost:8000/"; 

  return (
    <authDataContext.Provider value={{ isAuthenticated, login, logout, serverUrl }}>
      {children}
    </authDataContext.Provider>
  );
};
