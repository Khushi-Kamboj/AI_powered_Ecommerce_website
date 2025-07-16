import React, { useContext, useState , useEffect } from 'react';
import Registration from './pages/Registration';
import Home from './pages/Home';
import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';
import { Nav } from './component/Nav';
import { userDataContext } from '../context/UserContext.jsx';
import ProtectedRoute from './component/ProtectedRoutes';

function App() {
  const { userData } = useContext(userDataContext);

  return (
    <>
      {userData && <Nav />}
      
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
      </Routes>
    </>
  );
}

export default App;
