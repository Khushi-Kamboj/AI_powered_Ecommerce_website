import React from 'react';
import { FaCircle } from "react-icons/fa";

const Hero = ({ heroData, heroCount, setHeroCount }) => {
  return (
    <div className='w-[40%] h-full relative z-10 px-2 sm:px-4 flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center w-full mt-6 sm:mt-10'>
        {/* Text */}
        <div className='text-[#abc3de] text-[12px] xs:text-[13px] sm:text-[16px] md:text-[24px] lg:text-[36px] leading-tight max-w-[90vw] xs:max-w-xs sm:max-w-md text-center'>
          <p>{heroData.text1}</p>
          <p>{heroData.text2}</p>
        </div>

        {/* Dots */}
        <div className='flex gap-[4px] xs:gap-[6px] sm:gap-[10px] justify-center w-full mt-6 sm:mt-10'>
          {[0, 1, 2, 3].map((idx) => (
            <FaCircle
              key={idx}
              className={`
                w-[5px] h-[5px] 
                xs:w-[7px] xs:h-[7px] 
                sm:w-[14px] sm:h-[14px] 
                cursor-pointer transition duration-200
                ${heroCount === idx ? 'fill-orange-400' : 'fill-white'}
              `}
              onClick={() => setHeroCount(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
