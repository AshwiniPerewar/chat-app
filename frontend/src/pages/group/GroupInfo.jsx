import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../utils/api";
import { headers } from "../../utils/headers";

const GroupInfo = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [added, setAdded] = useState([]);
  const [members, setMembers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [group, setGroup] = useState({});
  const navigate = useNavigate();
  const groupId = useParams().groupId;
  // fetching all users list
  useEffect(() => {
    const searchMembers = async () => {
      try {
        const res = await axios.get(
          `${api}/groups/${groupId}/search-member?q=${searchQuery}`,
          headers
        );
        setMembers(res.data);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    searchMembers();
  }, [searchQuery]);

  useEffect(() => {
    fetchUsers();
    fetchGroupInfo();
  }, []);

  const fetchUsers = async () => {
    try {
      const userRes = await axios.get(`${api}/users`, headers);
      setUsers(userRes.data.members);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const fetchGroupInfo = async () => {
    try {
      const grpRes = await axios.get(`${api}/groups/${groupId}`, headers);
      setGroup(grpRes.data);
      setMembers(grpRes.data.members);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const removeMember = async (member) => {
    try {
      if (
        window.confirm(
          `Are you sure to remove ${member.username} from ${group.name}?`
        )
      ) {
        const res = await axios.put(
          `${api}/groups/remove-user`,
          { groupId, userId: member._id },
          headers
        );
        if (res) {
          alert(`${member.username} removed from ${group.name} successfully`);
          fetchGroupInfo();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editGroupName = async () => {
    try{
    if (!groupName ) alert("Please enter New Group name");
    else {
      const res = await axios.put(
        `${api}/groups/rename-group`,
        { groupName,groupId },
        headers
      );
      if (res.data) alert("Group Name Edited successfully");
fetchGroupInfo();
setGroupName("");
    }}
    catch(err)
    {
      console.log(err)
    }
  };

  return (
    <div className="container col-sm-4 mt-4 shadow-lg p-4 " style={{"height":"500px"}}>
      <h2 className="mb-4 text-center">{group.name}</h2>
      <div className="d-flex justify-content-between ">
        <div>{members.length} members</div>
        <input
          className="w-50"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="search member name"
        />
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </div>
      </div>
      <Link to={`/add-member/${groupId}`} className="text-decoration-none text-black">
      <div className="d-flex color-green mt-3 w-50 gap-2">
        <div className="border p-2 rounded-circle bg-success ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-person-plus-fill"
          viewBox="0 0 16 16"
        >
          <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          <path
            fill-rule="evenodd"
            d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"
          />
        </svg>
        </div>
        <div className="mt-2">Add members</div>
      </div>
     </Link>
      <div className="border-bottom mt-3"></div>
      <div className="d-flex flex-column mt-3 overflow-scroll h-50">
        {members.map((member) => (
          <div key={member._id} className="d-flex justify-content-between">
            <div className="mt-1">{member.username}</div>
            <div>
              <svg
                onClick={() => removeMember(member)}
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
        ))}
      </div>
      <div className="d-flex justify-content-between mt-3 ">
        <input
          className="w-100"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Enter New Group Name"
        ></input>
        <button onClick={editGroupName}>
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

export default GroupInfo;
