import React from 'react'
import { useState } from 'react';
import { useCallback } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import '../App.css'
import { MovieContext } from '../Contexts/MovieContext';
import MoviesDetailsPage from './MoviesDetailsPage';
import errimg from '../assets/prwimg.png';

export default function MovieDetails() {

    const { id } = useParams();
    const { MovieDetails, MovieCast, dispatch, CastImg } = useContext(MovieContext)

    const API_Key = '4ee812b6fb59e5f8fc44beff6b8647ed';
    const API_image = 'https://image.tmdb.org/t/p/w500/';


    console.log('this is id', id);


    useEffect(() => {

        getDetail();
        getCastDetails();

    }, [id])

    const getDetail = useCallback(() => {

        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_Key}&language=en-US`)
            .then(res => res.json())
            .then(data => {
                console.log(data, 'data');
                dispatch({ type: 'AddMovieDetail', payload: { data: data } })
            })

    }, [id])

    const getCastDetails = useCallback(() => {

        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_Key}&language=en-US`)
            .then(res => res.json())
            .then(data => {
                dispatch({ type: 'AddMovieCastDetail', payload: { cast: data.cast } })
            }
            )

    }, [id])

    useEffect(() => {

        console.log(MovieDetails, 'MovieDetails')
        console.log(MovieCast, 'Movie Cast')
        console.log(CastImg, 'CastImg');

    }, [MovieDetails, MovieCast])

    const handleOnError = (e) => {
        e.target.src = errimg;
      }


    document.addEventListener('click', e => {
        e.preventDefault();
       
        let handle;
        if (e.target.matches(".handle")) {
            handle = e.target
        } else {
            handle = e.target.closest(".handle")
        }

        if (handle != null) onHandleClick(handle, e)

    })

    function onHandleClick(handle, e) {
        const slider = handle.closest(".MovieCastContainer").querySelector(".slider")
        
        console.log(e,'eeesdfsf');

        const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue("--slider-index"));

        console.log(sliderIndex, 'sliderindex')

        if (handle.classList.contains("left-handle")) {

            if (sliderIndex <= 0) {

                e.stopImmediatePropagation()
                slider.style.setProperty("--slider-index", (sliderIndex - 1) * 0)

                
            }else{
                slider.style.setProperty("--slider-index", sliderIndex - 1)
            }

            console.log('i got clicked')
            
        }

        if (handle.classList.contains("right-handle")) {


            slider.style.setProperty("--slider-index", sliderIndex + 1)
        }


    }

    const castInfo = MovieCast && MovieCast.map(data => <img key={data.id} src={API_image + data.profile_path} alt={data.name} onError={handleOnError} />)


    return (

        <div>
            <MoviesDetailsPage {...MovieDetails} />


            <div className='MovieCastContainer'>

                <button className="handle left-handle">
                    <div className="text">&#8249;</div>
                </button>

                <div className='slider'>

                    {

                        castInfo ? castInfo : <div>...Loading</div>
                    }

                </div>

                <button className="handle right-handle">
                    <div className="text">&#8250;</div>
                </button>

            </div>


        </div>


    )
}




