import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomeNavBar from './components/HomeNavBar';
import MoviesPopular from './components/MoviesPopular';
import TopRated from './components/TopRated'
import UpcomingMovies from './components/UpcomingMovies'
import MovieDetails from './components/MovieDetails'


function App() {

  return (
    <BrowserRouter>
    

        <HomeNavBar />

        <Routes>

          <Route path='/' element={<MoviesPopular />}></Route>
          <Route path='/TopRated' element={<TopRated />}></Route>
          <Route path='/Upcoming' element={<UpcomingMovies />}></Route>
          <Route path='/MovieDetail/:id' element={<MovieDetails />}></Route>

        </Routes>
        
        </BrowserRouter>
    
  )

}

export default App
