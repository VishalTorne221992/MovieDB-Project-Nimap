import React from 'react'
import '../carousel.css'
import Headererrimg from '../assets/No_image_available-forProject.png';

export default function MoviesDetailsPage({ id, poster_path, backdrop_path, API_Key, CastDetails }) {

    const API_image = 'https://image.tmdb.org/t/p/w500/';
    
    const handleOnErrorImg = (e) => {
        e.target.src = Headererrimg;
      }

    

    return (
        <div className="MovieDetailsPageCont">

            <div className='MovieDetailsContainer'>
                <div className="headerImg"><img src={API_image + backdrop_path} alt='backdrop_path' style={{ width: '100%', borderRadius: '10px' }} onError={handleOnErrorImg} /></div>
            </div>

        </div>
    )
}
