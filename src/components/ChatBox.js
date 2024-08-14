import React, { useEffect, useState } from "react";
import { useChatContext } from "../context/ChatContext";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import {io} from "socket.io-client";

let ENDPOINT = "http://localhost:5000";
let socket, selectedChatCompare;

function ChatBox(props) {
  const { user, selectedChat, notifications, setNotifications } = useChatContext();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', user);
    socket.on('connection', ()=> setSocketConnected(true));
    console.log(socket);
  }, [])

  async function fetchChat() {
    try {
      const data = await axios.get(`/api/messages/${selectedChat._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      
      setMessages(data.data);
      socket.emit('join room', selectedChat._id);
    } catch (error) {
      console.log(error);
    } finally {
        document.getElementById('lastChatDummy').scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        // console.log(document.getElementById('lastChatDummy'));
    }
  }
  useEffect(() => {
    fetchChat();
  }, [selectedChat]);

  async function submitHandler(event) {
    event.preventDefault();
    if(!message){
        console.log("Write a message");
        return;
    }
    try{
        const data = await axios.post(`/api/messages/${selectedChat._id}`, {
            "content": message
        }, {
            headers:{
                Authorization: `Bearer ${user.token}`,
            }
        });
        setMessages([...messages, data.data]);
        socket.emit("send message", data.data);
        setMessage("");
    } catch(error) {
        console.log(error);
    } finally {
        document.getElementById('lastChatDummy').scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        // console.log(document.getElementById('lastChatDummy'));
    }
  }

  useEffect(function(){
    socket.on('message received', function(newMessage){
      console.log("Message Received: ", newMessage);
      console.log(selectedChat._id);
      if(!selectedChat || selectedChat._id !== newMessage.chat._id ){
        setNotifications([newMessage, ...notifications]);
      } else{
        setMessages([...messages, newMessage]);
        document.getElementById('lastChatDummy').scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
      }
    })
  })

  return (
    <div className="w-full h-full text-white flex flex-col">
      <div className="grow overflow-y-auto p-2">
        {messages.map(function (ele, index) {
          // console.log(ele.sender._id, user);
          return (
            <div
              key={index}
              className={`chat ${
                ele.sender._id === user.id ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={ele.sender.pic}
                  />
                </div>
              </div>
              <div className="chat-header">
                {ele.sender.username}
                <time className="text-xs opacity-50 ml-1">{ele.createdAt.substr(11, 5)}</time>
              </div>
              <div className="chat-bubble">{ele.content}</div>
              {/* <div className="chat-footer opacity-50">Delivered</div> */}
            </div>
          );
        })}
        <div id="lastChatDummy"></div>
      </div>
      <form className="flex w-full" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Type here"
          value={message}
          onChange={(event)=>{setMessage(event.target.value)}}
          className="input input-bordered w-full grow"
        />
        <button className="bg-slate-600 w-12 hover:bg-slate-700 rounded-md ml-2">
          {" "}
          <IoSend className="m-auto" />{" "}
        </button>
      </form>
    </div>
  );
}

export default ChatBox;
