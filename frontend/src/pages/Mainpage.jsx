import React, { useState, useEffect } from 'react'
import Hero from '../Components/Hero'
import { useAnimeStore } from '../assets/Store'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import SmallSlider from '../Components/SmallSlider'

const Mainpage = () => {
    
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    const { newAnime, fetchNewAnime } = useAnimeStore();

    useEffect(() =>  {
        fetchNewAnime();
      }, [fetchNewAnime]);

    const newFiltered = newAnime.filter((anime, index, self) => index=== self.findIndex((a) => a.mal_id === anime.mal_id));

    console.log(newFiltered);

    const useViewWidth = () => {
        const [viewWidth, setViewWidth] = useState(window.innerWidth);
        
        useEffect(() => {
            const handleResize = () => {
                setViewWidth(window.innerWidth);
            };
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);
        return viewWidth;
    }

    let winWidth = useViewWidth();
    

  return (
    <>
      <h1 className='text-3xl m-10 ml-20 mr-15 xl:ml-45 xl:mr-55 lg:ml-35 lg:mr-30'>New Releases</h1>
      <div className='w-full'>
        <Slider {...settings} className='object-contain m-10 ml-15 mr-15 max-h-80 min-h-65 min-w-[450px] xl:ml-40 xl:mr-40 lg:ml-30 lg:mr-30' style={{height: winWidth/3}}>
        {newFiltered.map((anime) => (
            <Hero key={anime.mal_id} anime={anime} height={winWidth/3} />
        ))}
        </Slider>
      </div>
      <h1 className='text-3xl m-10 ml-20 mr-15 xl:ml-45 xl:mr-55 lg:ml-35 lg:mr-30'>Upcoming Anime</h1>
      <div>
        <SmallSlider width={winWidth} type={"upcoming"}/>
      </div>  
    </>
  )
}

export default Mainpage