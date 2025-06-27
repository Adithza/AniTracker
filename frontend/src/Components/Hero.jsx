import React, { useState, useEffect } from 'react';

const Hero = ({ anime, height }) => {
  

  return (
    <>
      <div className='max-h-80 min-h-65 flex' style={{ height: height}}>
        <img src={anime.images.jpg.image_url} className='h-full rounded-xl ml-5' alt="Anime Image" />
        <div className='w-1/2'>
        <p className='ml-10 sm:text-2xl md:text-4xl md:h-[80px] md:mt-5 md:ml-15 text-xl h-[60px] overflow-hidden w-full'>{anime.title}</p>
        <p className='ml-10 mt-5 md:ml-15 md:h-[75px] overflow-hidden h-[70px] text-md'>{anime.synopsis}</p>
        <button className='ml-10 mt-10 md:ml-15 md:mt-3 lg:mt-6 border-2 w-[120px] h-1/5 p-1 rounded-xl hover:bg-white hover:text-black transition-colors duration-300'>Read More</button>
        </div>
      </div>
    </>
  );
};

export default Hero;