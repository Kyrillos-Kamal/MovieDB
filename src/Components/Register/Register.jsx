import React, { useState } from 'react'
import './Register.css'
import axios from 'axios'
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const navigation = useNavigate();
  const [errorList, setErrorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    email: "",
    password: ""
  });

  function getUserData(e) {
    let myUser = { ...user }
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }

  async function submitUserDate(e) {
    e.preventDefault();
    setIsLoading(true);


    let validate = validateUser(user);
    if (validate.error) {
      setIsLoading(false);
      setErrorList(validate.error.details) // for errors 
    } else {
      let { data } = await axios.post(`https://routeegypt.herokuapp.com/signup`, user);
      if (data.message === 'success') {
        setIsLoading(false);
        navigation('/login');
      } else {
        setError(data.message);
        setIsLoading(false);
      }
    }
  }


  function validateUser(user) {
    let schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(10).required().label('First Name'),
      last_name: Joi.string().alphanum().min(3).max(10).required().label('Last name'),
      age: Joi.number().min(16).max(80).required().label('Age '),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).label('Email '),
      password: Joi.string().label('Password')
    });
    return schema.validate(user, { abortEarly: false })
  }

  return (<>
    <div className='py-3'>
      <h2 className='text-white mb-3'>SignUp Form</h2>

      {errorList.map((error, index) => {
        if (index === 4) {
          return <div key={index} className='alert alert-danger'>Password Invalid</div>
        } else {
          return <div key={index} className='alert alert-danger'>{error.message}</div>
        }
      })}
      {error.length > 0 ? <div className='alert alert-danger'>{error} </div> : ''}

      <form onSubmit={submitUserDate} className="form-floating position-relative">
        <div className="form-floating mb-3">
          <input onChange={getUserData} type="text" className="form-control mb-3" name='first_name' id="first_name" placeholder="First Name" />
          <label htmlFor="first_name">First Name</label>
        </div>
        <div className="form-floating">
          <input onChange={getUserData} type="text" className="form-control mb-3" name='last_name' id="last_name" placeholder="Last Name" />
          <label htmlFor="last_name">last Name</label>
        </div>

        <div className="form-floating">
          <input onChange={getUserData} type="number" className="form-control mb-3" name='age' id="age" placeholder="Age" />
          <label htmlFor="age">Age</label>
        </div>

        <div className="form-floating">
          <input onChange={getUserData} type="email" className="form-control mb-3" name='email' id="email" placeholder="Email" />
          <label htmlFor="email">Email</label>
        </div>

        <div className="form-floating">
          <input onChange={getUserData} type="password" className="form-control mb-3" name='password' id="password" placeholder="Password" />
          <label htmlFor="password">Password</label>
        </div>

        <button className='btn btn-outline-info position-absolute end-0 text-white' type='submit'>
          {isLoading === true ? <i className='fa-solid fa-spinner'></i> : 'Register'}
        </button>
      </form>
    </div>
  </>
  )
}
