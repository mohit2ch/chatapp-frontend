import React, { useState } from "react";
import { useChatContext } from "../context/ChatContext";
import { IoMdAddCircle } from "react-icons/io";
import AddUsers from "./AddUsers";
import axios from "axios";

function GroupChatModal(props) {
  const [groupChatName, setGroupChatName] = useState("");
  const { user, setSelectedChat, setChats, chats } = useChatContext();
  const [users, setUsers] = useState([]);

  function userListHandler(ele) {
    setUsers([ele, ...users]);
  }

  async function createGroupChat(){
    try{
        const data = await axios.post(`/api/chat/group`, {
            name:groupChatName,
            users,
        },{
            headers:{
                Authorization: `Bearer ${user.token}`
            }
        });
        console.log(data.data);
        setSelectedChat(data.data);
        setChats([data.data, ...chats]);
        props.SetOpenModal(!props.openModal);
    } catch(error){
        console.log(error);
    }
  }

  return (
    <div
      className="h-full grow flex justify-center items-center rounded-lg bg-blue-500 ml-2 p-4"
      style={{ height: "80vh" }}
    >
      <div className="card bg-primary text-primary-content w-96 h-full">
        <div className="card-body text-white h-full">
          <h2 className="card-title">New Group Chat</h2>
          <label className="input input-bordered flex items-center gap-2 mb-4 bg-blue-400">
            Group Name
            <input
              type="text"
              className="grow placeholder-gray-300"
              value={groupChatName}
              onChange={(event) => {
                setGroupChatName(event.target.value);
              }}
              placeholder="My Chat"
            />
          </label>

          <h2>Group Admin</h2>
          <button
            className="p-4 flex items-center bg-blue-200 text-blue-900 rounded-md"
            onClick={() => {}}
            disabled={true}
          >
            <div className="mr-2">
              <div className="w-10 rounded-xl">
                <img src={user.pic} />
              </div>
            </div>
            <div className=" flex flex-col items-start">
              <span className="font-bold">{user.username}</span>
              <span className="text-sm">{user.email}</span>
            </div>
          </button>
          <h2>Group Members</h2>
          <ul className=" bg-blue-300 rounded-md w-full p-0 overflow-y-auto">
            <li>
              <AddUsers userListHandler={userListHandler} users={users} />
            </li>
            {users.map(function (ele, index) {
              return (
                <li
                  className={index === users.length - 1 || "border-b-2"}
                  key={index}
                >
                  <button
                    className="p-2 flex w-full items-center bg-blue-200 text-blue-900"
                    onClick={() => {setUsers(users.filter(function(elem){
                        // console.log(elem._id, ele._id);
                        return elem._id !== ele._id;
                    }))}}
                    disabled={false}
                  >
                    <div className="mr-2">
                      <div className="w-10 rounded-xl">
                        <img src={ele.pic} />
                      </div>
                    </div>
                    <div className=" flex flex-col items-start">
                      <span className="font-bold">{ele.username}</span>
                      <span className="text-sm">{ele.email}</span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
          <button className="btn btn-success shadow-lg text-white w-full" onClick={createGroupChat}>Create Group Chat</button>
        </div>
      </div>
    </div>
  );
}

export default GroupChatModal;
