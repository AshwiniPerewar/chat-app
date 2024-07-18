import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import { headers } from "../../utils/headers";
import { AuthContext } from "../../context/AuthContext";

const CreateGroup = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [added, setAdded] = useState([]);
  const [newMembers, setNewMembers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const navigate = useNavigate();
  const {userData}=useContext(AuthContext);

  // fetching all users list
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `${api}/users?q=${searchQuery}`,
          headers
        );
        setUsers(res.data.users.filter((el)=>el._id!==userData._id));
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    fetchUsers();
  }, [searchQuery]);

  const handleAdded = async (user) => {
    if (newMembers.includes(user._id)) alert("User Already Added");
    else {
      setAdded([...added, user]);
      setNewMembers([...newMembers,user._id])
      setSearchQuery("");
    }
  };

  const handleRemove = (user) => {
    setAdded(added.filter((el) => el._id !== user._id));
    setNewMembers(newMembers.filter((el) => el !== user._id));
  };

  const createGroup = async () => {
    try{
    if(newMembers.length===0)
    alert("Atleast one contact must be selected")
  else if (!groupName) alert("Please enter Group name");
    else {
      const res = await axios.post(
        `${api}/groups`,
        { groupName
          ,admin:userData._id, members:newMembers },
        headers
      );
      console.log(res)
      if (res.data) alert("Group Created successfully");
      navigate("/groups");
    }}
    catch(err)
    {
      console.log(err.response.data.message);
      alert(err.response.data.message)
    }
  };

  return (
    <div className="container col-sm-4 mt-3 pt-2 shadow-lg " style={{"height":"500px"}}>
      <div className="d-flex gap-2">
      <Link to="/groups" className="text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-arrow-left mt-2"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
        </Link>
      <h4 className="mt-1 text-center">Create Group</h4>
      </div>
      <div className="d-flex justify-content-between ">
        <input
          className="w-100 form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="search username"
        />
       
      </div>
      <div className="d-flex h-20">
        {added.map((user) => (
          <div key={user._id} className="d-flex w-5 mt-3">
            <div className="border rounded-circle p-2">{user.username}</div>
            <svg
              onClick={() => handleRemove(user)}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
            </svg>
          </div>
        ))}{" "}
      </div>
      <div className="border-bottom mt-3"></div>

      <div className="d-flex flex-column shadow p-2 mt-3 h-50 overflow-scroll">
        {users.map((user) => (
          <div key={user._id} className="d-flex justify-content-between">
            <div className="">{user.username}</div>
            {newMembers.includes(user._id) ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-check-square-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
              </svg>
            ) : (
              <svg
                onClick={() => handleAdded(user)}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus-square-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0" />
              </svg>
            )}
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-between mt-3 ">
        <input
          className="w-100 form-control"
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Enter Group Name"
        ></input>
        <button onClick={createGroup}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-right-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CreateGroup;
