import React from 'react'

export default function About() {
  return (<>
    <div className="row align-items-center ">
      <div className='text-white'>
        <div className='mb-4'>
          <h2 >What is NOXE?</h2>
          <p>a website for practice purpose, it's a mini version of IMDB that provide reviews for movies. </p>
        </div>
        <div className="mb-4">
          <h2 >What are the tools that used?</h2>
          <p>I used VSCode to write this project</p>
        </div>
        <div className="mb-4">
          <h2 >Programming languages I used:</h2>
          <ul >
            <li className='fs-4 '>
              <a className='text-white' target='_blank' href="https://www.w3schools.com/html/" rel="noreferrer"><i className='fab fa-html5'></i> HTML5</a>
            </li>
            <li className='fs-4 '>
              <a className='text-white' target='_blank' href="https://www.w3schools.com/css/" rel="noreferrer"> <i className='fab fa-css3'></i> CSS 3</a>
            </li>

            <li className='fs-4 '>
              <a className='text-white' target='_blank' href="https://www.w3schools.com/js/" rel="noreferrer"> <i className='fab fa-js-square'></i> Javascript</a>

            </li>

          </ul>
        </div>
        <div className='mb-4'>
          <h2 >Framework I used:</h2>
          <a className='text-white' target='_blank' href="https://reactjs.org/" rel="noreferrer"> <p className='fs-4'><i className='fab fa-react'></i> ReactJS</p></a>

        </div>
        <div className='mb-4'>
          <h2 >Libraries I used:</h2>
          <div className="d-flex flex-wrap text-center justify-content-between">
            <a className='text-white' target='_blank' href="https://getbootstrap.com/" rel="noreferrer"> <p className='fs-5 mx-1'>Bootstrap</p></a>
            <a className='text-white' target='_blank' href="https://fontawesome.com/" rel="noreferrer"> <p className='fs-5 mx-1'>Font Awesome</p></a>
            <a className='text-white' target='_blank' href="https://jquery.com/" rel="noreferrer"> <p className='fs-5 mx-1'>jQuery</p></a>
            <a className='text-white' target='_blank' href="https://reactrouter.com/" rel="noreferrer"> <p className='fs-5 mx-1'>React Router</p></a>
            <a className='text-white' target='_blank' href="https://axios-http.com/" rel="noreferrer"> <p className='fs-5 mx-1'>Axios</p></a>
            <a className='text-white' target='_blank' href="https://joi.dev/" rel="noreferrer"> <p className='fs-5 mx-1'>Joi Validator</p></a>
            <a className='text-white' target='_blank' href="https://jwt.io/" rel="noreferrer"> <p className='fs-5 mx-1'>JWT Decoded</p></a>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
