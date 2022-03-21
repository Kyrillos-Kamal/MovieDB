import React, { useState } from 'react'
import axios from 'axios'
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';


export default function Login(props) {
  const navigation = useNavigate();
  const [errorList, setErrorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState({

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
      let { data } = await axios.post(`https://routeegypt.herokuapp.com/signin`, user);
      if (data.message === 'success') {
        localStorage.setItem('userToken',data.token)
        setIsLoading(false);
        props.userData();
        navigation('/home');
      } else {
        setError(data.message);
        setIsLoading(false);
      }
    }
  }


  function validateUser(user) {
    let schema = Joi.object({

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
                   return <div key={index} className='alert alert-danger bg-danger'>Password Invalid</div>
        } else {
          return <div key={index} className='alert alert-danger bg-danger'>{error.message}</div>
        }
      })}
      {error.length > 0 ? <div className='alert alert-danger'>{error} </div> : ''}

      <form onSubmit={submitUserDate} className="form-floating position-relative">

        <div className="form-floating">
          <input onChange={getUserData} type="email" className="form-control mb-3" name='email' id="email" placeholder="Email" />
          <label htmlFor="email">Email</label>
        </div>

        <div className="form-floating">
          <input onChange={getUserData} type="password" className="form-control mb-3" name='password' id="password" placeholder="Password" />
          <label htmlFor="password">Password</label>
        </div>

        <button className='btn btn-outline-info position-absolute end-0 text-white' type='submit'>
          {isLoading === true ? <i className='fa-solid fa-spinner'></i> : 'Login'}
        </button>
      </form>
    </div>
  </>
  )
}
