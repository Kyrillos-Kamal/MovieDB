import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
export default function TVShows() {
  const KEY = '6f8de9774098c6a1a75305941920486d';
  const ImageBaseURL = `https://image.tmdb.org/t/p/w500/`
  const [allTV, setAllTV] = useState([])
  async function getAllTV() {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${KEY}`);
    setAllTV(data.results)
  }
  useEffect(() => { getAllTV(); }, []);
  useEffect(() => {
    getAllTV();
    return () => {
      getAllTV({});
    };
  }, []);
  return (<>
    <div className="row align-items-center mb-5">

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
  </>
  )
}
