import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../../utils/api";
import { Link, useParams } from "react-router-dom";
import { headers } from "../../utils/headers";

const GroupChatPage = ({ match }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const groupId = useParams().groupId;
  const { userData } = useContext(AuthContext);
  const [name, setName] = useState("");

  // fetch group and messages
  useEffect(() => {
    fetchGroup();
    fetchMessages();
  });

  // fetching group details
  const fetchGroup = async () => {
    try {
      const group = await axios.get(`${api}/groups/${groupId}`, headers);
      setName(group.data.group.name);
    } catch (err) {
      console.log(err);
    }
  };

  // fetching messages in a group
  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${api}/messages/${groupId}`, headers);
      setMessages(res.data);
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
      else{
        await axios.post(
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
      await axios.put(
        `${api}/messages/${messageId}/like`,
        { userId: userData._id },
        headers
      );
      fetchMessages();
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div
      className="container col-sm-4 shadow-lg p-2 mt-4"
      style={{ height: "500px" }}
    >
      <div className="d-flex   justify-content-between border-bottom border-2 w-100">
        <div className="d-flex gap-2">
        <Link to="/groups" className="text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="28"
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
          <h4 className="mt-1">{name}</h4>
        </div>
        {/* Dropdown */}
        <div class="dropdown mt-2" type="button">
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
            <li>
              <Link to={`/group-info/${groupId}`} class="dropdown-item">
                Group Info
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="overflow-scroll px-2 h-75 d-flex flex-column">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`w-75 p-2 mt-2 lh-1 ${
              userData.username === message.sender
                ? "align-self-end bg-warning-subtle"
                : "align-self-start bg-light"
            }`}
          >
            {userData.username !== message.sender && (
              <p className="text-primary lh-1">{message.sender}</p>
            )}
            <p className="lh-1">{message.content}</p>
            <div
              className={`w-4 lh-1 ${
                message.likes.includes(userData.username) && "text-danger"
              }`}
              onClick={() => handleLike(message._id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-heart-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                />
              </svg>
              {message.likes.length}
            </div>
          </div>
        ))}
      </div>

      <div className="container d-flex w-100 mt-2 p-2">
        <input
          type="text"
          className="w-100 form-control px-6 shadow"
          value={newMessage}
          placeholder="Write Message"
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <div className=" w-5 mt-1" type="button">
          <svg
            onClick={handleSubmit}
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            class="bi bi-arrow-right-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default GroupChatPage;
