import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react'
import MovieBox from '../MovieBox'

export default function TopRated() {

    const [TopRatedMovies, setTopRatedMovies] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pageCount, SetPageCount] = useState(0)

    const TOPR_API_url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=4ee812b6fb59e5f8fc44beff6b8647ed'

    useEffect(() => {

        fetch(TOPR_API_url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setTopRatedMovies(data.results)
        })


    },[])

    useEffect(() => {
        pagecountfunc();
        console.log(TopRatedMovies.length, 'movie list');
        console.log(pageCount, 'page count');
        console.log(currentPage, 'currentPage')




    }, [TopRatedMovies, currentPage])


    const indexOfLastItem = currentPage * 8;
    const indexOfFirstItem = indexOfLastItem - 8;
    const currentItems = TopRatedMovies.slice(indexOfFirstItem, indexOfLastItem)

    const pagecountfunc = useCallback(() => {

        SetPageCount(Math.round(TopRatedMovies.length / 8))

    }, [TopRatedMovies])

    const setCurrentPagediv = (e) => {
        console.log(typeof (Number(e.target.textContent)), 'event');
        setCurrentPage(Number(e.target.textContent));
    }

    const paginationItems = []

    for (let i = 1; i <= pageCount; i++) {
        paginationItems[i] = <div key={i}> <Link to='#' onClick={(e) => setCurrentPagediv(e)}><span>{i}</span></Link> </div>
    }

  return (
    <div className='MoviesTopRated'>

            <div className='MovieList'>

                {
                    currentItems.map(movie => <MovieBox key={movie.id} {...movie} />)
                }

            </div>

            <div className="pagination">

                <div className='paginationdiv'><a className='pageNum' href="/"><span className='pagnumText'> &lt; </span></a></div>

                {
                    paginationItems
                }

                <div className='paginationdiv'><a className='pageNum' href="/"><span className='pagnumText'> &gt; </span></a></div>
            </div>


        </div>
  )
}
