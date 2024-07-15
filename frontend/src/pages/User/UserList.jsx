import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { api } from "../../utils/api";
import CreateUser from "./CreateUser";
import { headers } from "../../utils/headers";
import { AuthContext } from "../../context/AuthContext";

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const{userData}=useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");

  // fetching all users list
  useEffect(() => {
      const fetchUsers = async () => {
        try {
          const res = await axios.get(
            `${api}/users/?q=${searchQuery}`,
            headers
          );
          setUsers(res.data.users.filter((el)=>el._id!=userData._id));
        } catch (err) {
          console.log(err.response.data.message);
        }
      };
      fetchUsers();
    }, [searchQuery]);

  // const fetchUsers = async () => {
  //   try {
  //     const res = await axios.get(`${api}/users`, headers);
  //     setUsers(users.length==0 && [...users,userData,...res.data.users.filter(user=>user._id!=userData._id)]);
  //   } catch (err) {
  //     alert(err);
  //   }
  // };

  

  return (
    <div className="container col-sm-4 mt-5 shadow-lg p-4"  style={{"height":"467px"}}>
      <h2 className="text-center">Users List</h2>
      <input
          className="w-100 form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="search username"
        />
       
      <div className="mt-3 shadow p-3 overflow-scroll h-75">
        {users.map((user) => (
          <div key={user._id} className="d-flex justify-content-between mt-2">
            <div>{userData.username==user.username ? "Me" : user.username}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserListPage;
