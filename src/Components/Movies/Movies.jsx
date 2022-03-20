import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Movies() {
  const KEY = '6f8de9774098c6a1a75305941920486d';
  const ImageBaseURL = `https://image.tmdb.org/t/p/w500/`


  const [allMovies, setAllMovies] = useState([])

  async function getAllMovies() {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${KEY}`);
    setAllMovies(data.results);
    console.log(allMovies);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { getAllMovies(); }, []);
  useEffect(() => {
    getAllMovies();
    return () => {
      getAllMovies({});
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (<>
    <div className="row align-items-center mb-5">

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
  </>

  )
}
