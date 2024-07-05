import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import {  useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { api } from '../../utils/api';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const naviagte = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(!username || !password)
    alert("Please Enter username and password")
    else{
      const res = await axios.post(`${api}/users/login`, { username, password });
      console.log(res)
      login(res.data.token,res.data.userData);
      naviagte("/groups")
    }
    } catch (err) {
      console.error(err);
      alert(err.response.data.message)
    }
  };

  return (
    <div className="container  col-sm-4 mt-5">
      <h2 className="text-center p-2">Login</h2>
      <form onSubmit={handleSubmit} className='p-5 shadow-lg'>
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
        <button type="submit" className="btn btn-primary w-100 mt-4">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
