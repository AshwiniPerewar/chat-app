import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../../utils/api';
import { headers } from '../../utils/headers';

const RenameGroup = () => {
    const[groupName,setGroupName]=useState({});
    const[newGroup,setNewGroup]=useState("");
const groupId=useParams().groupId;
const navigate=useNavigate();
    useEffect(()=>{
        // fethcing group info
  fetchGroupInfo();
    })

    const fetchGroupInfo = async () => {
        try {
          const grpRes = await axios.get(`${api}/groups/${groupId}`, headers);
          setGroupName(grpRes.data.group.name);
        } catch (err) {
          console.log(err.response.data.message);
        }
      };


    const editGroupName = async () => {
        try {
             await axios.put(
              `${api}/groups/rename-group`,
              { name:newGroup, groupId },
              headers
            );
           alert("Group renamed successfully");
            navigate(`/group-info/${groupId}`);         
        } 
        catch (err) {
          console.log(err);
          alert(err)
        }
      };

  return (
    <div className='container col-sm-4 shadow-lg mt-4' style={{"height":"480px"}}> 
    <div className='form-group d-flex mt-5 pt-2 gap-2'>
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
   className="form-control  border-success"
    // value={newGroup}
    placeholder={`${groupName}`}
    onChange={(e) => setNewGroup(e.target.value)}
  />
  </div>
  <div className='col d-flex flex-column text-success' style={{"height":"90%"}}>
  <div className='d-flex w-100 mt-auto'>
  <button className='border w-50 btn  p-2 '><Link to={`/group-info/${groupId}`} className='text-success text-decoration-none' >Cancel </Link></button>
    <button className='btn btn-outline-success border w-50  p-2' onClick={editGroupName}>Ok</button>
    </div>

  </div>
  </div>
  )
}

export default RenameGroup