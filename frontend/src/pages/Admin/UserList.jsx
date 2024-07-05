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

  // fetching all users list
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${api}/users`, headers);
      console.log(res.data)
      setUsers(res.data);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const deleteUser=async(userId,username)=>{
    try{
      if(window.confirm(`Are you sure to delete ${username}?`))
      {
    const res=await axios.delete(`${api}/users/${userId}`, headers);
    if(res)
    {
        setUsers(users.filter((el)=>el._id!=userId));
        alert("User Deleted Successfully");
    }} }catch (err) {
      alert(err.response.data.message);
    }
  }

  return (
    <div className="container col-sm-4 mt-4  p-4" style={{"height":"467px"}}>
      <h2 className="mt-2 text-center">Users List</h2>
      {userData.isAdmin &&
      <div className="d-flex flex-row-reverse">
        {" "}
        <Link to="/create-user" className="d-flex text-decoration-none">
          {" "}
          <p className="fs-5"><svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            class="bi bi-plus-square-fill"
            viewBox="0 0 16 16"
          >
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0" />
          </svg>{" "}Add User</p>
          
        </Link>
      </div>}
      <div className="mt-2 shadow p-3 overflow-scroll h-75">
        {users.map((user) => (
          <div key={user._id} className="d-flex justify-content-between mt-2">
            <div>{user.username}</div>
            {userData.isAdmin &&
            <div className="d-flex gap-1">
              <div>
                {" "}
                <Link to={`/edit-user/${user._id}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fill-rule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                    />
                  </svg>
                </Link>
              </div>
              <div onClick={()=>deleteUser(user._id,user.username)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash3-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                </svg>
              </div>
            </div>
}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserListPage;
