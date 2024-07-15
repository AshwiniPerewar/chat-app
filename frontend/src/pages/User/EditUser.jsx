import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { api } from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { headers } from "../../utils/headers";

const EditUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const userId = useParams().userId;
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${api}/users/${userId}`, headers);
      console.log(res);
      setUsername(res.data.username);
      setPassword(res.data.password);
    } catch (err) {
      alert(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!username || !password) alert("Please enter username and password");
      else {
        if (window.confirm("Are you sure to edit user details")) {
          const res = await axios.put(
            `${api}/users/edit/${userId}`,
            { username, password },
            headers
          );
          alert("User Edited successfully");
          navigate("/users");
        }
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="container col-sm-4 mt-5">
      <h2 className="my-4 text-center">Edit user</h2>
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
            type="text"
            className="form-control mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-5">
          Edit User
        </button>
      </form>
    </div>
  );
};

export default EditUser;
