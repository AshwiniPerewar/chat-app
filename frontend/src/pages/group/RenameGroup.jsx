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
          console.log(grpRes.data)
          setGroupName(grpRes.data.name);
        } catch (err) {
          console.log(err.response.data.message);
        }
      };


    const editGroupName = async () => {
        try {
            const res = await axios.put(
              `${api}/groups/rename-group`,
              { groupName, groupId },
              headers
            );
            fetchGroupInfo();
            setNewGroup("");
            navigate(`/edit-group/${groupId}`)          
        } 
        catch (err) {
          console.log(err);
        }
      };

  return (
    <div className='container col-sm-4 shadow-lg mt-4' style={{"height":"480px"}}> 
    <div className='form-group d-flex mt-5 pt-2 gap-2'>
    <input
   className="form-control  border-success"
    value={groupName}
    onChange={(e) => setNewGroup(e.target.value)}
  />
  </div>
  <div className='col d-flex flex-column text-success' style={{"height":"90%"}}>
  <div className='d-flex w-100 mt-auto'>
  <button className='border w-50 btn btn-outline-success p-2 text-danger'><Link to={`/edit-group/${groupId}`} className='text-success text-decoration-none' >Cancel </Link></button>
    <button className='btn btn-outline-success border w-50  p-2' onClick={editGroupName}>Ok</button>
    </div>

  </div>
  </div>
  )
}

export default RenameGroup