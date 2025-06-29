import React, { useEffect} from 'react'
import Slider from 'react-slick'
import { useAnimeStore } from '../assets/Store'

const SmallSlider = ({width, type}) => {

    const {newAnime, topAnime, upcomingAnime, fetchData} = useAnimeStore();

    let reqAnime = [];

    switch(type) {
        case "upcoming":
            useEffect(() =>  {
                    fetchData("upcoming");
                  }, [fetchData]);
                  if (upcomingAnime) {
                    reqAnime = upcomingAnime.filter(
                      (anime, index, self) =>
                        index === self.findIndex((a) => a.mal_id === anime.mal_id)
                    );
                  }
            break;
        
          case "new":
            useEffect(() => {
                  fetchData("new")
            }, [fetchData])
            if (upcomingAnime) {
              reqAnime = newAnime.filter(
                (anime, index, self) =>
                  index === self.findIndex((a) => a.mal_id === anime.mal_id)
              );
            };
            break;
          
          case "top":
            useEffect(() => {
                  fetchData("top")
            }, [fetchData])
            if (upcomingAnime) {
              reqAnime = topAnime.filter(
                (anime, index, self) =>
                  index === self.findIndex((a) => a.mal_id === anime.mal_id)
              );
            };
            break;
          
        
             
    }

    console.log(reqAnime);

    const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: Math.floor(width/180),
    slidesToScroll: 1
    }
    
    return (
      <div className='mt-10 ml-15 mr-15 xl:ml-40 xl:mr-55 lg:ml-30 lg:mr-30'>
        <Slider {...settings}>
          {reqAnime.map((anime) => (
            
              <div className='pl-5 aspect-[5/6] w-full'>
                <img
                  src={anime.images.jpg.image_url}
                  className='w-full h-full object-cover rounded-xl'
                  alt={anime.title}
                />
                <p className='h-[45px] overflow-hidden text-sm'>{anime.title}</p>
            </div>
          ))}
        </Slider>
      </div>
    );
}

export default SmallSlider