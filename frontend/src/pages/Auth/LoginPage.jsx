import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import {  Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { api } from '../../utils/api';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const naviagte = useNavigate();

  // function to call when clicked on login button
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(!username || !password) //check if username or password is empty
    alert("Please Enter username and password")
    else{
      // api call with username and password
      const res = await axios.post(`${api}/users/login`, { username, password });
      await login(res.data.token,res.data.userData); //call login function
      alert("Logged In Successfully") 
      naviagte("/groups") //navigate to grouplist page
    }
    } catch (err) {
      console.error(err);
      alert(err.response.data.message)
    }
  };

  return (
    <div className="container p-2 col-sm-4 mt-5 shadow-lg" style={{"height":"400px"}}>
      <h2 className="text-center mt-4">Login</h2>
      {/* Form to take input username and password from user */}
      <form onSubmit={handleSubmit} className='p-4'>
        <div className="form-group mt-2">
          <label>Username</label>
          <input
            type="text"
            className="form-control mt-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group mt-2">
          <label>Password</label>
          <input
            type="password"
            className="form-control mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* log in button */}
        <button type="submit" className="btn btn-primary w-100 mt-4">Login</button>
      </form>
      {/* link to sign up */}
      <p className='text-center p-1'>Don't have an account?<Link to="/signup" className='ml-1'>Sign up </Link></p>

    </div>
  );
};

export default LoginPage;
