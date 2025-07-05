import React, { useEffect, useState } from 'react';
import Background from '../component/Background.jsx';
import Hero from '../component/Hero.jsx';

const Home = () => {
  const heroData = [
    { text1: '40% OFF Limited Offer!!', text2: 'Style that' },
    { text1: 'Discover the Best of Bold Fashion', text2: 'Limited Time Only!' },
    { text1: 'Explore Our Best Collection', text2: 'Shop Now!' },
    { text1: 'Choose your Perfect Fashion Fit', text2: 'Now on Sale!' },
  ];

  const [heroCount, setHeroCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((prevCount) => (prevCount === 3 ? 0 : prevCount + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='overflow-x-hidden '>
      <div className='flex w-full lg:h-[100vh] md:h-[60vh] sm:h-[vh] mt-[40px] relative bg-gradient-to-l from-[#141414] to-[#0c2025]'>
        <Hero heroData={heroData[heroCount]} heroCount={heroCount} setHeroCount={setHeroCount} />
        <Background heroCount={heroCount} />
      </div>
    </div>
  );
};

export default Home;