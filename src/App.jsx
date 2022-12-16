import React, { useEffect, useCallback } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import MovieBox from './MovieBox'
import HomeNavBar from './components/HomeNavBar';
import MoviesPopular from './components/MoviesPopular';
import Home from './components/Home';
import TopRated from './components/TopRated'
import UpcomingMovies from './components/UpcomingMovies'
import MovieDetails from './components/MovieDetails'
import { MovieContextProvider } from './Contexts/MovieContext'

function App() {

  return (
    <HashRouter>
    

        <HomeNavBar />

        <Routes>

          <Route path='/' element={<MoviesPopular />}></Route>
          <Route path='/TopRated' element={<TopRated />}></Route>
          <Route path='/Upcoming' element={<UpcomingMovies />}></Route>
          <Route path='/MovieDetail/:id' element={<MovieDetails />}></Route>

        </Routes>
        
        </HashRouter>
    
  )

}

export default App
