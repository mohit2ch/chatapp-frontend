import React, { useEffect, useState } from "react";
import { useChatContext } from "../context/ChatContext";
import { FaUserCircle } from "react-icons/fa";
import MessageBox from "./MessageBox";
import GroupChatModal from "./GroupChatModal";
import { IoCloseCircle } from "react-icons/io5";

function MyChats({ loading }) {
  const [loggedUser, setLoggedUser] = useState(
    localStorage.getItem("userInfo")
  );

  const { chats, user, selectedChat, setSelectedChat } = useChatContext();
  const [openModal, SetOpenModal] = useState(false);

  function clickHandler() {
    SetOpenModal(!openModal);
    setSelectedChat(null);
  }

  function profilepic(chat) {
    if (chat.isGroupChat)
      return (
        <FaUserCircle
          className="mr-4"
          style={{ width: "3rem", height: "3rem" }}
        />
      );
    const arr = chat.users.filter(function (ele) {
      //   console.log(ele._id, user.id);
      return ele._id !== user.id;
    });
    return (
      <div className="mr-4">
        <div className="w-12 rounded-full">
          <img src={arr[0].pic} />
        </div>
      </div>
    );
  }

  function setChatName(chat) {
    if (chat.isGroupChat) return chat.chatName;
    const arr = chat.users.filter(function (ele) {
      //   console.log(ele._id, user.id);
      return ele._id !== user.id;
    });
    return arr[0].username;
  }

  return (
    <div className="m-4 flex flex-col md:flex-row justify-center items-center">
      <div
        className="p-3 bg-blue-800 rounded-md flex flex-col"
        style={{ height: "80vh", width: "350px" }}
      >
        <div className="flex w-full bg-blue-600 p-2 mb-2 rounded-md text-white justify-between items-center">
          <h2 className="font-bold text-2xl">MyChats</h2>
          {openModal ? (
            <button
              className="btn btn-error shadow-md rounded-lg  text-white text-lg"
              onClick={clickHandler}
            >
              {" "}
              <IoCloseCircle style={{width:'24px', height:'24px'}}/>
            </button>
          ) : (
            <button
              className="btn btn-primary shadow-md rounded-lg  text-white text-lg"
              onClick={clickHandler}
            >
              {" "}
              New Group Chat+
            </button>
          )}
        </div>
        <ul className=" bg-blue-400 rounded-md w-full grow overflow-y-auto">
          {chats.map(function (ele, index) {
            return (
              <li
                className={index === chats.length - 1 || "border-b-2"}
                key={index}
              >
                <button
                  className={`p-4 ${
                    selectedChat &&
                    selectedChat._id === ele._id &&
                    "bg-blue-600 text-white"
                  } hover:bg-blue-600 hover:text-white w-full flex items-center`}
                  onClick={() => {
                    // console.log(ele);
                    setSelectedChat(ele);
                    SetOpenModal(false);
                  }}
                  disabled={loading}
                >
                  {profilepic(ele)}
                  <div className=" flex flex-col items-start">
                    <span className="font-bold">{setChatName(ele)}</span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {openModal ? <GroupChatModal SetOpenModal={SetOpenModal} openModal={openModal} /> : <MessageBox />}
    </div>
  );
}

export default MyChats;
