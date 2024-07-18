import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../utils/api";
import { headers } from "../../utils/headers";
import { AuthContext } from "../../context/AuthContext";

const EditGroup = () => {
  const [members, setMembers] = useState([]);
  const [adminList, setAdminList] = useState([]);
  const [group, setGroup] = useState({});
  const groupId = useParams().groupId;
  const [isUserAdmin,setIsUserAdmin]=useState(false);
  const { userData } = useContext(AuthContext);
  const navigate=useNavigate();
  
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
      setIsUserAdmin(grpRes.data.group.admin.some(el=>el._id==userData._id))
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  // Exit from group
  const exitFromGroup = async (userData) => {
    try {
      if (
        window.confirm(
          `Are you sure to exit from ${group.name}?`
        )
      ) {
        const res = await axios.put(
          `${api}/groups/exit`,
          { groupId, userId: userData._id },
          headers
        );
        if (res) {
          alert(`Exited from ${group.name}`);
navigate("/groups")        }
      }
    } catch (error) {
      console.log(error);
    }
  };



  const removeMember = async (member) => {
    try {
      if (
        window.confirm(
          `Are you sure to ${
            member ? "remove" + member.username : "exit"
          }} from ${group.name}?`
        )
      ) {
        const res = await axios.put(
          `${api}/groups/remove-user`,
          { groupId, userId: member ? member._id : userData._id },
          headers
        );
        if (res) {
          member
            ? alert(
                `${member.username} removed from ${group.name} successfully`
              )
            : alert(`Exited from ${group.name}`);
          fetchGroupInfo();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="container col-sm-4 mt-4 shadow-lg p-4 "
      style={{ height: "500px" }}
    >
      <div className="d-flex  mt-2 justify-content-between  w-100 ">
      <Link to={`/group-chat/${groupId}`} className="text-black">
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
        <div className="d-flex flex-column text-center">
        {/* <div className="rounded-circle" style={{"width":"40px","height":"40px","border":"1px solid black"}}></div> */}
        <h4>{group.name}</h4>
        <div>Group. {members.length} members</div>
        </div>
        
        {/* Dropdown started*/}
        <div class="dropdown" type="button">
          <div data-bs-toggle="dropdown" aria-expanded="false">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-three-dots-vertical"
              viewBox="0 0 16 16"
            >
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
            </svg>{" "}
          </div>
          <ul class="dropdown-menu">
            {isUserAdmin &&
            <li>
              <Link to={`/add-members/${groupId}`} class="dropdown-item">
                Add Members{" "}
              </Link>
            </li>}
            <li>
              <Link to={`/rename-group/${groupId}`} class="dropdown-item">
                Change Group Name{" "}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Dropdown ended */}
      {/* ----------- */}
      {/* search member */}
      <div className="d-flex justify-content-between mt-2
      ">
       <div>{members.length} members</div>
       <Link to={`/search-member/${groupId}`}>
        {/* search icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="black"
            class="bi bi-search"
            viewBox="0 0 16 16"
            type="button"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </Link>
        </div>

        {/* Link to add members page */}
      {isUserAdmin && (
        <Link
          to={`/add-members/${groupId}`}
          className="text-decoration-none text-black"
        >
          <div className="d-flex mt-3 w-50 gap-2">
            {/* Add member Icon */}
            <div
              className="border px-1 mt-2 rounded-circle bg-primary"
              
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="white"
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
      )}


      <div className="d-flex flex-column mt-2 h-50 overflow-scroll " style={{"height":"300px"}}>
        {members && members.map((member) => ( //mmember list
          <div
            key={member._id}
            type="button"
            className="d-flex justify-content-between p-1"
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            {" "}
            {isUserAdmin &&
            <div
              class="modal fade "
              id="exampleModalCenter"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div
                class="modal-dialog modal-dialog-centered modal-md"
                role="document"
              >
                <div class="modal-content">
                  <div class="modal-body">
                   <div>Remove {member.username}</div>
                  </div>
                </div>
              </div>
            </div>
}
            {/* model ends */}
            <div className="mt-1">
              {member.username === userData.username ? "You" : member.username}
            </div>
            {adminList.includes(member._id) && (
              <div
                className="mt-2 px-1 pt-1 bg-primary text-white"
                style={{
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
      {/* Exit Group */}
      <div className="text-danger d-flex gap-3 mt-2" onClick={()=>exitFromGroup(userData)} type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          class="bi bi-box-arrow-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
          />
          <path
            fill-rule="evenodd"
            d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
          />
        </svg>
        <div>Exit Group</div>
      </div>
      {/* Exit group ended */}
    </div>
  );
};

export default EditGroup;
