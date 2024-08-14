import axios from "axios";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useChatContext } from "../context/ChatContext";
import { Link } from "react-router-dom";
function Sidebar(props) {
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, selectedChat, setSelectedChat, chats, setChats } = useChatContext();
  const [users, setUsers] = useState([]);

  async function searchHandler(event) {
    event.preventDefault();
    if (!keyword) {
      setError("Keyword cannot be empty");
    } else {
      setLoading(true);
      try {
        const data = await axios.get(`/api/users/?search=${keyword}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (data.error) {
          throw new Error(data.error);
        }
        
        setUsers(data.data);
        
        setError(null);
      } catch (error) {
        setError("Check the console");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }

  
  async function accessChat(ele){
    setLoading(true);
    
    try{
      // console.log(ele);
      const data = await axios.post('/api/chat/', {userId: ele._id}, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      if(data.error){
        throw new Error(data.error);
      }
      console.log(data.data);
      const newChat = data.data.chat;
      const flag = chats.filter(function(elem){
        // console.log(elem._id, newChat._id);
        return (elem._id === newChat._id);
      });
      if(flag.length === 0){
        setChats([newChat, ...chats]);
      }
      setError(null);
      setSelectedChat(newChat);
    } catch(error){
      setError("Check the console");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-drawer"
          className="btn bg-blue-500 border-none font-bold text-gray-200 hover:bg-blue-700"
        >
          {" "}
          <FaSearch /> Search Users
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="menu bg-blue-200 min-h-full w-80  text-black">
          <div
            role="alert"
            className={`alert alert-error ${error || "hidden"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
          <form
            className="flex input input-bordered mt-2 bg-white rounded-md p-2"
            onSubmit={searchHandler}
          >
            <input
              value={keyword}
              placeholder="Keyword"
              onChange={(event) => {
                setKeyword(event.target.value);
              }}
              className="bg-white w-full focus:border-none"
            />
            <button className="p-2 hover:border-l-2" disabled={loading}>
              {loading ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                <FaSearch />
              )}
            </button>
          </form>
          <ul className="menu bg-blue-300 rounded-md w-full mt-4 p-0">
            {users.map(function (ele, index) {
              return (
                <li
                  className={index === users.length - 1 || "border-b-2"}
                  key={index}
                >
                  <button className="p-4 hover:bg-blue-500 flex" onClick={()=>{accessChat(ele)}} disabled={loading}>
                    <div className="avatar">
                      <div className="w-10 rounded-xl">
                        <img src={ele.pic} />
                      </div>
                    </div>
                    <div className=" flex flex-col items-start">
                      <span className="font-bold">{ele.username}</span>
                      <span>{ele.email}</span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
