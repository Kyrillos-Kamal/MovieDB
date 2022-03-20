import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar(props) {
  return (<>
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="home">NOXE</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {props.userData ? <>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="movies">Movies</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="tvshows">TV Shows</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="about">About</Link>
              </li>

            </> : ''}

          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
     

            <ul className="nav-item ms-auto text-white d-flex align-items-center px-0">
              {props.userData ? <>
                <span onClick={props.logout} className='logout mx-1'>Logout</span></> : <>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to='login'>Login</Link>
                </li>
              </>}



            </ul>
          </ul>

        </div>
      </div>
    </nav>
  </>
  )
}
