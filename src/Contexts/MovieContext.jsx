import React, { createContext, useCallback } from 'react'
import { useLayoutEffect, useEffect } from 'react';
import { useReducer } from 'react'


export const MovieContext = React.createContext();

function MovieReducer(state, actions) {

  switch (actions.type) {

    case 'MoviesToShow' :{

      return {

        ...state,
                MoviesToShow : actions.payload
      }

    }

    case 'getAllPopMovies' : {

      return {
           ...state,
                  AllPopularMovies : actions.payload
      }
    }

    case 'AddMovieDetail': {

      return {

        ...state,
        MovieDetails: actions.payload.data

      }
    }

    case 'AddMovieCastDetail': {

      return {

        ...state,
        MovieCast: actions.payload.cast

      }

    }

    case 'AddCastImagesList': {

      return {
        ...state,
        CastImagesList: actions.payload.castImgList
      }
    }

    default:
      return state;
  }

}

const initialState = {

  MoviesToShow: [],
  AllPopularMovies: [],
  MovieName: '',
  MovieDetails: [],
  MovieCast: [],
  CastImagesList: []

}

export function MovieContextProvider({ children }) {

  const [state, dispatch] = useReducer(MovieReducer, initialState)
  const { MoviesToShow, AllPopularMovies, MovieDetails, MovieCast, CastImagesList } = state

  const API_image = 'https://image.tmdb.org/t/p/w500/';

  const API_url = 'https://api.themoviedb.org/3/movie/popular?api_key=4ee812b6fb59e5f8fc44beff6b8647ed'

  useEffect(() => {

    const CastImg = MovieCast.map(cast => {
      return <img src={API_image + cast.profile_path} alt={cast.name} />
    })

    dispatch({ type: 'AddCastImagesList', payload: { castImgList: CastImg } })

  }, [MovieCast])

  useEffect(() => {

      
    fetch(API_url)
      .then(res => res.json())
      .then(data => {
        dispatch({ type:'MoviesToShow', payload : data.results})
        dispatch({ type:'getAllPopMovies', payload : data.results})
      })

    },[])
  
    console.log(AllPopularMovies,'AllPopularMoviesctx');

  return (
    <MovieContext.Provider value={{ MoviesToShow, AllPopularMovies,  MovieDetails, MovieCast, dispatch, CastImagesList }}>
      {children}
    </MovieContext.Provider>
  )
}
