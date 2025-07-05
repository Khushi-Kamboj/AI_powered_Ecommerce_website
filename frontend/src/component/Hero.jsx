import React from 'react';
import { FaCircle } from "react-icons/fa";

const Hero = ({ heroData, heroCount, setHeroCount }) => {
  return (
    <div className='w-[40%] h-full relative z-10'>
      {/* Wrapper positioned top-left */}
      <div className='absolute top-[25%] left-[20%] flex flex-col items-start'>
        {/* Text */}
        <div className='text-white text-[20px] md:text-[40px] lg:text-[55px] leading-tight'>
          <p>{heroData.text1}</p>
          <p>{heroData.text2}</p>
        </div>

        {/* Dots centered under text */}
        <div className='flex items-center justify-center gap-[10px] mt- ml-[20%]'>
          {[0, 1, 2, 3].map((idx) => (
            <FaCircle
              key={idx}
              className={`w-[14px] h-[14px] cursor-pointer ${
                heroCount === idx ? 'fill-orange-400' : 'fill-white'
              }`}
              onClick={() => setHeroCount(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
