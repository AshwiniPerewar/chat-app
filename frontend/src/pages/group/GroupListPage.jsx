import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { api } from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";
import { headers } from "../../utils/headers";

const GroupListPage = () => {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");

  // fetching all groups list
  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const res = await axios.get(`${api}/groups`, headers);
      setGroups(res.data);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  // function to create a group
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!groupName) alert("Please enter group name");
    try {
      const res = await axios.post(`${api}/groups`, { groupName }, headers);
      fetchGroups();
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const deleteGroup = async (groupId, groupName) => {
    try {
      if (window.confirm(`Are you sure to delete ${groupName}?`)) {
        const res = await axios.delete(`${api}/groups/${groupId}`, headers);
        if (res) {
          setGroups(groups.filter((el) => el._id != groupId));
          alert("Group Deleted Successfully");
        }
      }
    } catch (err) {
      console.log(err)
      alert(err);
    }
  };

  return (
    <div className="container col-sm-4 my-5 " style={{"height":"467px"}}>
      <h2 className="my-4 text-center">Groups</h2>
      <div className="d-flex flex-row-reverse">
        {" "}
        <Link to="/create-group" className="d-flex text-decoration-none">
          {" "}
          <p className="fs-5">Create Group<svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            class="bi bi-plus-square-fill"
            viewBox="0 0 16 16"
          >
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0" />
          </svg>{" "}</p>
          
        </Link>
      </div>
      {groups && (
        <div className=" mt-2 shadow p-3 overflow-scroll h-75">
          {groups.map((group) => (
            <div key={group._id} className="list-group-item mt-2">
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                <Link to={`/group/${group._id}`}>{group.name} </Link>
                </div>
                <div className="d-flex justify-content-between w-25">
                  {/* <Link to={`/add-member/${group._id}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-person-fill-add"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                      <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                    </svg>
                  </Link>{" "} */}
                  <div >
                  <svg onClick={() => deleteGroup(group._id, group.name)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="currentColor"
                    class="bi bi-trash3-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                  </svg>
                  </div>
                  </div>

                </div>
             
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupListPage;
