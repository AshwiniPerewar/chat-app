import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../../utils/api";
import { Link, useParams } from "react-router-dom";
import { headers } from "../../utils/headers";
const token = localStorage.getItem("token");

const GroupChatPage = ({ match }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [users, setUsers] = useState([]);
  const groupId = useParams().groupId;
  const { userData } = useContext(AuthContext);
  const [name, setName] = useState("");
  useEffect(() => {
    fetchGroup();
    fetchMessages();
  },[]);

  // fetching group details
  const fetchGroup = async () => {
    try {
      const group = await axios.get(`${api}/groups/${groupId}`, headers);
      setName(group.data.name);
    } catch (err) {
      console.log(err);
    }
  };

  // fetching messages in a group
  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${api}/messages/${groupId}`, headers);
      setMessages(res.data);
      console.log(res.data)
    } catch (err) {
      console.log(err);
      // alert(err.message);
    }
  };

  // add message
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!newMessage) alert("Please enter a message text");
      {
      const res = await axios.post(
        `${api}/messages`,
        {
          group: groupId,
          content: newMessage,
        },
        headers
      );
      fetchMessages();
      setNewMessage("");
      }
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  // add message likes
  const handleLike = async (messageId) => {
    try {
      const updatedMessage = await axios.put(
        `${api}/messages/${messageId}/like`,token,
        headers
      );
      fetchMessages();
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div>
    <div className="container col-sm-4 shadow-lg mt-5" style={{"height":"500px"}}>
      <h2 className="mt-4 text-center">{name}</h2>
      <div className="d-flex flex-row-reverse">
      <Link to={`/edit-group/${groupId}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      class="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fill-rule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                      />
                    </svg>
                  </Link>
                  </div>
        <div className="overflow-scroll h-75 ">
        {messages.map((message) => (
          <div>
          <div key={message._id} className="border border-2 w-auto p-2 mt-2 col-auto">
            {userData.username!==message.sender && <p className="text-primary lh-1 ">{message.sender}</p>}
            <p className="lh-1">{message.content}</p>
          </div>
          {message.likes.includes(userData.username) ?
          <div
              className="w-4 lh-1 text-danger"
              onClick={() => handleLike(message._id)}
            > <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
          </svg>
              {message.likes.length}
            </div>:<div
              className="w-4 lh-1"
              onClick={() => handleLike(message._id)}
            > <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
          </svg>
              {message.likes.length}
            </div>}
              
          </div>
        ))}
      </div>
      <div className="container d-flex mt-3">
        <input
            type="text"
            className="w-100"
            value={newMessage}
            placeholder="Write Message"
            onChange={(e) => setNewMessage(e.target.value)}
          />
        <div className="">
        <svg  onClick={handleSubmit} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
</svg></div>
          
    </div>
      </div>
      
    </div>
  );
};

export default GroupChatPage;
