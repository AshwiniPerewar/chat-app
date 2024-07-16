import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../utils/api";
import { headers } from "../../utils/headers";
import { AuthContext } from "../../context/AuthContext";

const AddMemberpage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [added, setAdded] = useState([]);
  const [members, setMembers] = useState([]);
  const [newMembers, setNewMembers] = useState([]);
  const { userData } = useContext(AuthContext);
  const [groupName, setGroupName] = useState("");
  const groupId = useParams().groupId;

  const navigate = useNavigate();
  // fetching users list according to search query
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `${api}/users/search?q=${searchQuery}`,
          headers
        );
        setUsers(res.data.users.filter((el) => el._id !== userData._id));
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    fetchUsers();
  }, [searchQuery]);

  // fetching group info
  useEffect(() => {
    fetchGroupInfo();
  });

  const fetchGroupInfo = async () => {
    try {
      const grpRes = await axios.get(`${api}/groups/${groupId}`, headers);
      setGroupName(grpRes.data.group.name);
      setMembers(grpRes.data.group.members);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  // add users to added array
  const handleAdded = async (user) => {
    if (added.some((member) => member._id === user._id))
      alert("User Already Added");
    else {
      setAdded([...added, user]);
      setNewMembers([...newMembers, user._id]);
      setSearchQuery("");
    }
  };

  // remove users from added array
  const handleRemove = (user) => {
    setAdded(added.filter((el) => el._id !== user._id));
    setNewMembers(newMembers.filter((el) => el !== user._id));
  };

  // function to add members to group
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
    <div
      className="container col-sm-4 mt-4 shadow-lg p-4"
      style={{ height: "500px" }}
    >
      <div className="d-flex gap-2">
        <Link to={`/group-info/${groupId}`} className="text-black">
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
        <input
          className="w-100 form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search username"
        />
        <div></div>
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

      <div className="d-flex flex-column mt-3 overflow-scroll h-75">
        {users.map((user) => (
          <div key={user._id} className="d-flex justify-content-between">
            <div className="">{user.username}</div>
            {members.some((member) => member._id === user._id) ||
            added.some((member) => member._id === user._id) ? (
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill={members.some((member) =>
                    member._id === user._id ? "green" : "green"
                  )}
                  class="bi bi-check-square-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
                </svg>
              </div>
            ) : (
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
            )}
          </div>
        ))}
      </div>
      {newMembers.length > 0 && (
        <button
          onClick={addMembers}
          className="btn btn-success mt-1 w-100 border-none text-white text-center p-2"
        >
          Add Members to Group
        </button>
      )}
    </div>
  );
};

export default AddMemberpage;
