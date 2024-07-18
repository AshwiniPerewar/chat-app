import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { api } from "../../utils/api";
import { headers } from "../../utils/headers";

const GroupListPage = () => {
  const [groups, setGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // fetching all groups list
  useEffect(() => {
    const fetchGroups=async()=>{
    try {
      const res =await axios.get(`${api}/groups?q=${searchQuery}`, headers);
      setGroups(res.data.groups);
    } catch (err) {
      alert(err.response.data.message);
    }}
    fetchGroups();
  }, [searchQuery]);


  return (
    <div className="container pt-2 shadow-lg col-sm-4 mt-4 " style={{"height":"500px"}}>
      <h2 className="my-4 text-center">Groups</h2>
      <input
          className="w-100 form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="search Group Name"
        />
      {groups && (
        <div className=" mt-2 shadow p-4 overflow-scroll h-50">
          {groups.map((group) =>  (
            <div key={group._id} className="list-group-item mt-2">
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                <Link to={`/group-chat/${group._id}`} className="text-decoration-none fs-5">{group.name} </Link>
                </div>
                  </div>
            </div>
          ))}
        </div>
      )}
     <Link to="/create-group" className="text-decoration-none">
          {" "}
        <button className="btn btn-primary w-100 mt-4">Create Group</button>
        </Link> 
    </div>
  );
};

export default GroupListPage;
