import React from 'react';
import Hero from './Hero';
import Background from './Background';

const HeroSection = ({ heroData, heroCount, setHeroCount }) => {
  return (
    <div className="flex w-full h-[calc(100vh-65px)] mt-[65px] relative bg-gradient-to-l from-[#141414] to-[#0c2025]">
      <Hero heroData={heroData} heroCount={heroCount} setHeroCount={setHeroCount} />
      <Background heroCount={heroCount} />
    </div>
  );
};

export default HeroSection;
