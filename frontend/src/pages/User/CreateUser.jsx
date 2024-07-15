import React, { useState, useContext } from "react";
import axios from "axios";
import { api } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { headers } from "../../utils/headers";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // function to create a User
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) alert("Please enter username and password");
    e.preventDefault();
    try {
      username=username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
      console.log(username)
      const res = await axios.post(
        `${api}/users/create`,
        { username, password },
        headers
      );
      alert("User Created successfully");
      navigate("/users");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="container col-sm-4 mt-5 shadow-lg p-4">
      <h2 className="my-4 text-center">Create user</h2>
      <form onSubmit={handleSubmit} className="mt-2">
        <div className="form-group my-2">
          <label>Username</label>
          <input
            type="text"
            className="form-control mt-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group my-2">
          <label>Password</label>
          <input
            type="password"
            className="form-control mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-dark w-100 mt-4">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
