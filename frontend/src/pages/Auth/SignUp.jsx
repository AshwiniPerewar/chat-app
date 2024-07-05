import React, { useState, useContext } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { api } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${api}/users/register`, { username, password});
      console.log(res)
    alert("User Created successfully");
    navigate("/login")
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container  col-sm-6 mt-5">
      <h2 className="my-4 text-center">SignUp</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group p-5 shadow-lg">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button type="submit" className="btn btn-primary w-100 mt-2">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
