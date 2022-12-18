import React, { useEffect, useCallback, useContext } from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react'
import '../App.css'
import MovieBox from '../MovieBox'
import { MovieContext } from '../Contexts/MovieContext';


export default function MoviesPopular() {

    const [currentPage, setCurrentPage] = useState(1)
    const [pageCount, SetPageCount] = useState(0)

    const { AllPopularMovies , MoviesToShow } = useContext(MovieContext)

    useEffect(() => {
        
        pagecountfunc();

    }, [MoviesToShow, currentPage])


    const indexOfLastItem = currentPage * 8;
    const indexOfFirstItem = indexOfLastItem - 8;
    const currentItems = MoviesToShow.slice(indexOfFirstItem, indexOfLastItem)

    const pagecountfunc = useCallback(() => {

        SetPageCount(Math.round(MoviesToShow.length / 8))

    }, [MoviesToShow])

    const setCurrentPagediv = (e) => {
        console.log(typeof (Number(e.target.textContent)), 'event');
        setCurrentPage(Number(e.target.textContent));
    }

    const paginationItems = []

    for (let i = 1; i <= pageCount; i++) {
        paginationItems[i] = <div style={{border:'0.2rem solid black', padding:'0.6rem', backgroundColor:'teal'}} key={i}> <Link to='#' 
        onClick={(e) => setCurrentPagediv(e)} style={{textDecoration:'none', color:'white'}}><span>{i}</span></Link> </div>
    }

    return (
        <>
            
            <div className='MovieList'>

                {
                    currentItems ? currentItems.map(movie => <MovieBox key={movie.id} {...movie} />) : <div> ...Loading </div>
                }

            </div>

            <div className="pagination">

                <div className='paginationdiv'><a style={{textDecoration:'none', color:'white'}}
                onClick={(e) => 
                { 
                     e.preventDefault();
                     if(currentPage <= 1){
                        return
                     }
                     setCurrentPage(prev => prev - 1);
                }} 
                className='pageNum' href="/"><span className='pagnumText'> &lt; </span></a></div>

                {
                    paginationItems
                }

                <div className='paginationdiv'><a style={{textDecoration:'none', color:'white'}} 
                onClick={(e) => { 
                     e.preventDefault();
                     if(currentPage >= 3){
                        return
                     }
                     setCurrentPage(prev => prev + 1);
                    }} 
                className='pageNum' href="/"><span className='pagnumText'> &gt; </span></a></div>
            </div>


        </>
    )
}
