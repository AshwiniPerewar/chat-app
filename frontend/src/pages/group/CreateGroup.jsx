import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../utils/api";
import { headers } from "../../utils/headers";

const CreateGroup = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [added, setAdded] = useState([]);
  const [members, setMembers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const navigate = useNavigate();
  // fetching all users list
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `${api}/users/search?q=${searchQuery}`,
          headers
        );
        setUsers(res.data);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    fetchUsers();
  }, [searchQuery]);

  const handleAdded = async (user) => {
    if (members.includes(user._id)) alert("User Already Added");
    else {
      setAdded([...added, user]);
      setMembers([...members, user._id]);
      setSearchQuery("");
    }
  };

  const handleRemove = (user) => {
    setAdded(added.filter((el) => el._id != user._id));
    setMembers(members.filter((el) => el != user._id));
  };

  const createGroup = async () => {
    console.log(groupName);
    if (!groupName) alert("Please enter Group name");
    else {
      const res = await axios.post(
        `${api}/groups`,
        { groupName, members },
        headers
      );
      if (res.data) alert("Group Created successfully");
      navigate("/groups");
    }
  };

  return (
    <div className="container col-sm-4 mt-5 shadow-lg p-4">
      <h2 className="my-4 text-center">Create Group</h2>
      <div className="d-flex justify-content-between ">
        <input
          className="w-100"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="search username"
        />
        <div>
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg> */}
</div>
      </div>
      <div className="d-flex">
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

      <div className="d-flex flex-column mt-3 overflow-scroll">
        {users.map((user) => (
          <div key={user._id} className="d-flex justify-content-between">
            <div className="">{user.username}</div>
            {members.includes(user._id) ? (
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
      <div className="d-flex justify-content-between mt-5 ">
        <input
          className="w-100"
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
