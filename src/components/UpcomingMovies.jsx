import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react'
import MovieBox from '../MovieBox'

export default function UpcomingMovies() {

    const [UpcomingMovies, setUpcomingMovies] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pageCount, SetPageCount] = useState(0)

    const Upcoming_API_url = 'https://api.themoviedb.org/3/movie/upcoming?api_key=4ee812b6fb59e5f8fc44beff6b8647ed'

    useEffect(() => {

        fetch(Upcoming_API_url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setUpcomingMovies(data.results)
        })


    },[])

    useEffect(() => {
        pagecountfunc();
        console.log(UpcomingMovies.length, 'movie list');
        console.log(pageCount, 'page count');
        console.log(currentPage, 'currentPage')




    }, [UpcomingMovies, currentPage])


    const indexOfLastItem = currentPage * 8;
    const indexOfFirstItem = indexOfLastItem - 8;
    const currentItems = UpcomingMovies.slice(indexOfFirstItem, indexOfLastItem)

    const pagecountfunc = useCallback(() => {

        SetPageCount(Math.round(UpcomingMovies.length / 8))

    }, [UpcomingMovies])

    const setCurrentPagediv = (e) => {
        console.log(typeof (Number(e.target.textContent)), 'event');
        setCurrentPage(Number(e.target.textContent));
    }

    const paginationItems = []

    for (let i = 1; i <= pageCount; i++) {
        paginationItems[i] = <div key={i}> <Link to='#' onClick={(e) => setCurrentPagediv(e)}><span>{i}</span></Link> </div>
    }

  return (
    <div className='MoviesUpcoming'>

            <div className='MovieList'>

                {
                    currentItems.map(movie => <MovieBox key={movie.id} {...movie} />)
                }

            </div>

            <div className="pagination">

                <div className='paginationdiv'><a className='pageNum' href="/"><span className='pagnumText'> &lt; </span></a></div>

                {
                    paginationItems.length ? paginationItems : 'Loading....'
                }

                <div className='paginationdiv'><a className='pageNum' href="/"><span className='pagnumText'> &gt; </span></a></div>
            </div>


        </div>
  )
}

