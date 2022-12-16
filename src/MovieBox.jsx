import React from 'react';
import { Link } from 'react-router-dom'
import './App.css'
import errimg from './assets/prwimg.png';

const API_image = 'https://image.tmdb.org/t/p/w500/';

export default function MovieBox( {id, title, poster_path, vote_average, release_date, overview}) {

  const handleOnError = (e) => {
    e.target.src = errimg;
  }

  return (
    <div className='MovieBoxes'>
      
      { API_image+poster_path ? <Link to={`/MovieDetail/${id}`} style={{ textDecoration:'none'}}> <div className="movieImg"> <img src={API_image+poster_path} alt="movieImg" onError={handleOnError} /></div> </Link> : <div> ...Loading </div>}
      <Link to={`/MovieDetail/${id}`} style={{ textDecoration:'none', color:'whitesmoke'}}><div className="movietitle"><h2>{title}</h2></div></Link>
      <Link to='' style={{ textDecoration:'none', color:'whitesmoke'}}><div className='Rating'> <strong>Rating :</strong>  <strong>{vote_average}</strong></div></Link>


    </div>
  )
}



