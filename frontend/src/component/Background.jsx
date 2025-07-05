import React from 'react';
import bg_11 from '../assets/bg_11.png';
import bg_12 from '../assets/bg_12.avif';
import bg_13 from '../assets/bg_13.avif';
import bg_14 from '../assets/bg_14.jpg';

const images = [bg_11, bg_12, bg_13, bg_14];

const Background = ({ heroCount }) => {
  const bg = images[heroCount] || images[0];

  return (
    <div className='w-[60%] h-full flex items-center justify-center overflow-hidden z-0'>
      <img
        src={bg}
        alt='background'
        className='w-full h-auto max-h-full object-cover'
        draggable={false}
      />
    </div>
  );
};

export default Background;
