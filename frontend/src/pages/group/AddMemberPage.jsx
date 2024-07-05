import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../utils/api";
import { headers } from "../../utils/headers";

const AddMemberpage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [added, setAdded] = useState([]);
  const [members, setMembers] = useState([]);
  const [newMembers, setNewMembers] = useState([]);

  const [groupName, setGroupName] = useState("");
  const [group, setGroup] = useState({});
  const groupId = useParams().groupId;

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

useEffect(()=>{
  fetchGroupInfo();
},[])
  const fetchGroupInfo = async () => {
    try {
      const grpRes = await axios.get(`${api}/groups/${groupId}`, headers);
      setGroup(grpRes.data);
      setGroupName(grpRes.data.name);
      setMembers(grpRes.data.members);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const handleAdded = async (user) => {
    if (added.some(member=>member._id==user._id)) alert("User Already Added");
    else {
      setAdded([...added, user]);
      setNewMembers([...newMembers, user._id]);
      setSearchQuery("");
    }
  };

  const handleRemove = (user) => {
    setAdded(added.filter((el) => el._id != user._id));
    setNewMembers(newMembers.filter((el) => el != user._id));
  };

  const addMembers = async () => {
    if (!groupName) alert("Please enter Group name");
    else {
      const res = await axios.put(
        `${api}/groups/add-user`,
        { groupId, newMembers },
        headers
      );
      if (res.data) alert("Members added successfully");
      navigate(`/edit-group/${groupId}`);
    }
  };

  return (
    <div className="container col-sm-4 mt-4 shadow-lg p-4">
      <h2 className="my-2 text-center">{groupName}</h2>
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
            {members.some(member=>member._id==user._id)  || added.some(member=>member._id==user._id) ? 
              <div>
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
              </div>
            :
            
              <div>
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
              </div>
}
          </div>
        ))}
      </div>
      {newMembers.length>0 &&
      <button onClick={addMembers} className="btn btn-success mt-1 w-100 border-none text-white text-center p-2">
      Add Members to Group</button>}
    </div>
  );
};

export default AddMemberpage;
