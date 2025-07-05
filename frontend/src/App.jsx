import React, { useContext, useState , useEffect } from 'react';
import Registration from './pages/Registration';
import Home from './pages/Home';
import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';
import { Nav } from './component/Nav';
import HeroSection from './component/HeroSection';
import { userDataContext } from '../context/UserContext.jsx';

function App() {
  const { userData } = useContext(userDataContext);
  const [heroCount, setHeroCount] = useState(0);

  const heroData = [
    { text1: "Explore", text2: "Your Style" },
    { text1: "Discover", text2: "New Trends" },
    { text1: "Shop", text2: "The Collection" },
    { text1: "Unleash", text2: "Your Fashion" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount(prev => (prev + 1) % heroData.length);
    }, 2000); 

    return () => clearInterval(interval); 
  }, []); 

  return (
    <>
      {userData && <Nav />}
      
      <Routes>
        <Route
          path="/"
          element={
            userData ? (
              <>
                <HeroSection
                  heroData={heroData[heroCount]}
                  heroCount={heroCount}
                  setHeroCount={setHeroCount}
                />
              </>
            ) : (
              <Home />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
      </Routes>
    </>
  );
}

export default App;
