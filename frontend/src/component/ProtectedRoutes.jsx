import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userDataContext } from "../../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { userData, loading } = useContext(userDataContext);

  if (loading) return null; // or a spinner

  if (!userData) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;