import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './tvdetails.css'

export default function Tvdetails() {
    const [tvDetails, setTvDetails] = useState({});
    let params = useParams();
    const KEY = '6f8de9774098c6a1a75305941920486d';
    const ImageBaseURL = `https://image.tmdb.org/t/p/w500/`

    // console.log(props.tv);


    async function getTvDetails() {



        let { data } = await axios.get(`https://api.themoviedb.org/3/tv/${params.id}?api_key=${KEY}&language=en-US`);
        setTvDetails(data);

    }



    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { getTvDetails() }, []);
    useEffect(() => {
        getTvDetails();
        return () => {
            setTvDetails({});
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <>
        <div className="row justify-content-around flex-wrap mb-5">
            <div className="col-md-4">
                <img src={ImageBaseURL + tvDetails.poster_path} className='w-100' alt="" />
            </div>
            <div className="col-md-7">
                <h2 className='mb-2'>{tvDetails.name}</h2>
                <div className='mb-4'>
                    <p className='fs-5 fw-bold'>{tvDetails.tagline}</p>
                    <p className='fs-5 fw-bold'>{new Date(tvDetails.first_air_date).getFullYear().toString()}</p>
                </div>
                {tvDetails.genres?.map((genre, index) => <span key={index} className='me-4 my-4 genres'>{genre.name}</span>)}
                <div className='py-5'>
                    <p>Vote Average: {tvDetails.vote_average}</p>
                    <p>Vote Count: {tvDetails.vote_count}</p>
                    <p>{tvDetails.overview}</p>
                </div>
            </div>
        </div>
    </>
}