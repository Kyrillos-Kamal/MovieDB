import axios from 'axios';
import './Home.css'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
  const KEY = '6f8de9774098c6a1a75305941920486d';
  const ImageBaseURL = `https://image.tmdb.org/t/p/w500/`


  const [allMovies, setAllMovies] = useState([])
  const [allTV, setAllTV] = useState([])

  async function getAllMovies() {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${KEY}`);
    setAllMovies(data.results.splice(0, 10));
    console.log(allMovies);
  }

  async function getAllTV() {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${KEY}`);
    setAllTV(data.results.splice(0, 10))
  }


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { getAllMovies(); }, []);
  useEffect(() => { getAllTV(); }, []);

  useEffect(() => {
    getAllMovies();
    return () => {
      getAllMovies({});
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getAllTV();
    return () => {
      getAllTV({});
    };
  }, []);
  return (<>
    <div className="row align-items-center mb-5">
      <div className="col-md-4 ">
        <div className=' w-25 border-muted border-top border-1'></div>
        <h2 className='mb-4 py-3'>Trending <br /> Movies <br />To Watch Now</h2>
        <span className='text-muted '>Most Watched Movies By Day</span>
        <div className=' py-3 border-muted border-bottom border-1'></div>
      </div>
      {allMovies.map((movie, index) => <div key={index} className="col-md-2 p-3 mb-3">
        <div className="item position-relative">
          <Link to={`/moviedetails/${movie.id}`}>
            <img src={ImageBaseURL + movie.poster_path} className='w-100 mb-2' alt="" />
            <h5 className='title text-center'>{movie.title}</h5>
            <span className='rating position-absolute top-0'>{movie.vote_average}</span>
          </Link>
        </div>
      </div>
      )}
    </div>
    <div className="row align-items-center mb-5">
      <div className="col-md-4 ">
        <div className=' w-25 border-muted border-top border-1'></div>
        <h2 className='mb-4 py-3'>Trending <br /> TV <br />To Watch Now</h2>
        <span className='text-muted '>Most Watched TV Shows By Day</span>
        <div className=' py-3 border-muted border-bottom border-1'></div>
      </div>
      {allTV.map((tv, index) => <div key={index} className="col-md-2 mb-3 p-3">
        <div className="item position-relative">
          <Link to={`/tvdetails/${tv.id}`}>
            <img src={ImageBaseURL + tv.poster_path} className='w-100 mb-2' alt="" />
            <h5 className='title text-center'>{tv.name}</h5>
            <span className='rating position-absolute top-0'>{tv.vote_average}</span>
          </Link>
        </div>
      </div>
      )}


    </div>
  </>)
}
