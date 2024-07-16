import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { api } from '../../utils/api';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  
  // function to call when clicked on sign up button
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${api}/users/register`, { username, password});
      console.log(res)
    alert("User Created successfully");
    navigate("/login")
    } catch (err) {
      console.error(err);
      alert(err.response.data.message)
    }
  };

  return (
    <div className="container shadow-lg col-sm-4 mt-5 p-2" style={{"height":"400px"}}>
      <h2 className="mt-4 text-center">SignUp</h2>
      {/* form to take username and password from user */}
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
        {/* sign up button */}
        <button type="submit" className="btn btn-primary w-100 mt-4">Sign Up</button>
      </form>
      {/* link to login  */}
      <p className='text-center'>Already have an account?<Link to="/login">Log In </Link></p>
    </div>
  );
};

export default SignUp;
