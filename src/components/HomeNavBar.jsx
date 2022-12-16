import React from 'react'
import { useEffect, useContext, useCallback } from 'react';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { MovieContext } from '../Contexts/MovieContext';
import '../App.css'

export default function HomeNavBar() {

  const [PopularMovies, setPopularMovies] = useState([])
  const [SearchText, setSearchText] = useState('')
  const { MoviesToShow, AllPopularMovies, dispatch } = useContext(MovieContext)

  useEffect(() => {

    setSearchText('')

  }, [])

  useEffect(() => {

    setPopMovies();
    console.log(AllPopularMovies, 'PopularMovies')
    console.log(SearchText, 'SearchText')

  }, [AllPopularMovies, SearchText])

  const setPopMovies = useCallback(() => {

    setPopularMovies(AllPopularMovies)

  }, [AllPopularMovies])


  const handleMovieSearch = (e) => {

    let SearchTxt = e.target.value

    setSearchText(SearchTxt)

    if (SearchTxt.length <= 0) {
      dispatch({ type: 'MoviesToShow', payload: AllPopularMovies })
    }


  }

  //  let matches = []

  //  console.log(AllPopularMovies,'all popular movies in search')

  // if(SearchTxt.length >= 0){

  //    matches = PopularMovies.filter(movie => {
  //     const SearchRegex = new RegExp(`${SearchTxt}`, 'gi')
  //     return movie.title.match(SearchRegex)
  //    })

  //    return dispatch({ type:'getAllPopMovies', payload : matches})
  //  }

  //  console.log(matches,'matching movies')

  //  console.log(SearchTxt,'text movie');


  //   return dispatch({ type:'getAllPopMovies', payload : AllPopularMovies})




  const handleMovieSearchButton = (e) => {

    let moviesearch = document.getElementById('MovieNameSearch')

    console.log(moviesearch.value, 'Movie Search values');

    setSearchText(moviesearch.value)
    //moviesearch.value = '';

    let searchApi = `https://api.themoviedb.org/3/search/movie?api_key=4ee812b6fb59e5f8fc44beff6b8647ed&language=en-US&query=${SearchText}&page=1`

    fetch(searchApi)
      .then(res => res.json())
      .then(data => {

        dispatch({ type: 'MoviesToShow', payload: data.results })

      })



  }

  const handleFirstPageLink = (e) => {

    let moviesearch = document.getElementById('MovieNameSearch')

    console.log(moviesearch.value, 'Movie Search values');

    setSearchText(moviesearch.value)

    dispatch({ type: 'MoviesToShow', payload: AllPopularMovies });

  }

  const handlekeydown = (e) => {

    if (e.key === 'Enter') {
      console.log('Enter pressed')

      let moviesearch = document.getElementById('MovieNameSearch')

      console.log(moviesearch.value, 'Movie Search values');

      setSearchText(moviesearch.value)

      let searchApi = `https://api.themoviedb.org/3/search/movie?api_key=4ee812b6fb59e5f8fc44beff6b8647ed&language=en-US&query=${SearchText}&page=1`

      fetch(searchApi)
        .then(res => res.json())
        .then(data => {

          dispatch({ type: 'MoviesToShow', payload: data.results })

        })
        
        document.getElementById('linkbtn').click();

    }
  }

  return (
    <div className="Navbar">

      <div className="logo"> MovieDb </div>

      <div className='Rightside'>

        <Link to="/" onClick={(e) => handleFirstPageLink(e)} style={{ textDecoration: 'none', color: 'grey' }}>Popular</Link>

        <Link to="/TopRated" style={{ textDecoration: 'none', color: 'grey' }}>Top Rated</Link>

        <Link to="/Upcoming" style={{ textDecoration: 'none', color: 'grey' }}>Upcoming</Link>

        <input type="text" onKeyDown={(e) => handlekeydown(e)} name="MovieNameSearch" id="MovieNameSearch" placeholder='Movie Name' onChange={(e) => handleMovieSearch(e)} />

        <Link to="/" id='linkbtn' onClick={(e) => handleMovieSearchButton(e)}> <button className='buttonLink' style={{ color: 'grey' }}> Search </button>  </Link>

      </div>

    </div>
  )
}

