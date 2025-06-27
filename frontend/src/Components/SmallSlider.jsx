import React, { useEffect} from 'react'
import Slider from 'react-slick'
import { useAnimeStore } from '../assets/Store'

const SmallSlider = ({width, type}) => {

    const {newAnime, topAnime, upcomingAnime, fetchNewAnime, fetchUpcomingAnime} = useAnimeStore();

    let reqAnime = [];

    switch(type) {
        case "upcoming":
            useEffect(() =>  {
                    fetchUpcomingAnime();
                  }, [fetchUpcomingAnime]);
             reqAnime = upcomingAnime.filter((anime, index, self) => index=== self.findIndex((a) => a.mal_id === anime.mal_id));
    }

    const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
    }
    
  return (
    <div className='mt-10 ml-20 mr-15 xl:ml-45 xl:mr-55 lg:ml-35 lg:mr-30'>
        <Slider {...settings} >
            {reqAnime.map((anime) => (
                <img src={anime.images.jpg.image_url} />
            ))}
        </Slider>
    </div>
  )
}

export default SmallSlider