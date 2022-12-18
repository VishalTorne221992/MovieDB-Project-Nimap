import React from 'react'
import '../carousel.css'
import errimg from '../assets/prwimg.png';


export default function Carousel({name, profile_path}) {

  const API_image = 'https://image.tmdb.org/t/p/w500/';

  const handleOnError = (e) => {
    e.target.src = errimg;
  }

  console.log('carousel renndered')

  return <img className='sliderimg' src={API_image+profile_path} alt={name} onError={handleOnError}  />
      
      
 
}
