import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../utils/api";
import { headers } from "../../utils/headers";
import { AuthContext } from "../../context/AuthContext";

const SearchMember = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [members, setMembers] = useState([]);
  const [adminList, setAdminList] = useState([]);
  const [group, setGroup] = useState({});
  const groupId = useParams().groupId;
  const { userData } = useContext(AuthContext);
  const navigate=useNavigate();
  // fetching all users list
  useEffect(() => {
    const searchMembers = async () => {
      try {
        const res = await axios.get(
          `${api}/groups/${groupId}/search-member?q=${searchQuery}`,
          headers
        );
        setMembers(res.data.members);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    searchMembers();
  }, [searchQuery]);

  useEffect(() => {
    fetchGroupInfo();
  }, []);

  // fethcing group info
  const fetchGroupInfo = async () => {
    try {
      const grpRes = await axios.get(`${api}/groups/${groupId}`, headers);
      setGroup(grpRes.data.group)
      setMembers([userData,...grpRes.data.group.members.filter(el=>el._id!=userData._id)]);
      setAdminList(grpRes.data.group.admin.map((el) => el._id));
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <div
      className="container col-sm-4 mt-4 shadow-lg p-4 "
      style={{ height: "500px" }}
    >
       <input
   className="form-control  border-success"
   placeholder="Search Member name"
    onChange={(e) => setSearchQuery(e.target.value)}
  />
      <div className="d-flex shadow flex-column mt-5 overflow-scroll h-75">
        {members.map((member) => ( //mmember list
          <div
            key={member._id}
            type="button"
            className="d-flex justify-content-between"
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            
            <div className="mt-1">
              {member.username === userData.username ? "You" : member.username}
            </div>
            {adminList.includes(member._id) && (
              <div
                className="mt-2 px-1 pt-1"
                style={{
                  background: "lightGreen",
                  fontSize: "8px",
                  height:"20px",
                  borderRadius: "5px",
                  color:"black",
                  fontWeight:"bold"
                }}
              >
                Group Admin
              </div>)
            }
            </div>
            ))}
        
      </div>
     
    </div>
  );
};

export default SearchMember;
