import React, { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import axios from "axios";
import { useChatContext } from "../context/ChatContext";
import { FaSearch } from "react-icons/fa";

function AddUsers({userListHandler, users}) {
  const { user } = useChatContext();
//   console.log(userListHandler, users);
  const [keyword, setKeyword] = useState("");
  const [Users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
    function accessChat(curUser){
        userListHandler(curUser);
    }
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


        setUsers(data.data.filter(function(ele){
            return users.indexOf(ele);
        }));

        setError(null);
      } catch (error) {
        setError("Check the console");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="w-full flex">
      <button
        className="p-4 flex text-md justify-center items-center font-bold w-full bg-blue-600 hover:bg-blue-500"
        onClick={() => {
          document.getElementById("addUserModal").showModal();
        }}
        disabled={false}
      >
        Add member <IoMdAddCircle style={{ height: "20px", width: "20px" }} />
      </button>
      <dialog id="addUserModal" className="modal">
        <div className="modal-box">
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
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Select User To Add</h3>
          <form
            className="flex input input-bordered mt-2 bg-white text-black rounded-md p-2"
            onSubmit={searchHandler}
          >
            <input
              value={keyword}
              placeholder="Keyword"
              onChange={(event) => {
                setKeyword(event.target.value);
              }}
              className="bg-white w-full focus:border-none "
            />
            <button className="p-2 hover:border-l-2" disabled={loading}>
              {loading ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                <FaSearch className="text-black" />
              )}
            </button>
          </form>
          <ul className="menu bg-blue-500 rounded-md m-2 mt-4 p-0">
            {Users.map(function (ele, index) {
              return (
                <li
                  className={index === users.length - 1 || "border-b-2"}
                  key={index}
                >
                  <button
                    className="p-4 hover:bg-blue-700 flex"
                    onClick={() => {
                      accessChat(ele);
                    }}
                    disabled={loading}
                  >
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
          <div className="modal-action"></div>
        </div>
      </dialog>
    </div>
  );
}

export default AddUsers;
