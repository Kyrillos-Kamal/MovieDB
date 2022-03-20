import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Moviedetails.css'

export default function Moviedetails() {
    const [movieDetails, setMovieDetails] = useState({});
    let params = useParams();
    const KEY = '6f8de9774098c6a1a75305941920486d';
    const ImageBaseURL = `https://image.tmdb.org/t/p/w500/`
    async function getMovieDetails() {
        let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${KEY}&language=en-US`);
        setMovieDetails(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect((e) => { getMovieDetails() }, []);
    useEffect(() => {
        getMovieDetails();
        return () => {
            setMovieDetails({});
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <>
        <div className="row justify-content-around  mb-5">
            <div className="col-md-4">
                <img src={ImageBaseURL + movieDetails.poster_path} className='w-100' alt="" />
            </div>
            <div className="col-md-7">
                <h2 className='mb-2'>{movieDetails.title}</h2>
                <div className='mb-4'>
                    <p className='fs-5 fw-bold'>{movieDetails.tagline}</p>
                    <p className='  fs-5 fw-bold '>{new Date(movieDetails.release_date).getFullYear().toString()}</p>
                </div>
                {movieDetails.genres?.map((genre, index) => <span key={index} className='me-4 mb-5 genres'>{genre.name}</span>)}
                <div className='py-5'>
                    <p className='mb-3'>Vote Average: {movieDetails.vote_average}</p>
                    <p className='mb-3'>Vote Count: {movieDetails.vote_count}</p>
                    <p className='mb-3'>{movieDetails.overview}</p>
                </div>
            </div>
        </div>
    </>
}
