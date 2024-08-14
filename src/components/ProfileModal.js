import React, { useState } from "react";
import { useChatContext } from "../context/ChatContext";
import { IoIosLogOut } from "react-icons/io";
import axios from "axios";
function ProfileModal(props) {
  const { user, setUser } = useChatContext();
  const [loading, setLoading] = useState(false);
  //   console.log(user);
 function logoutHandler(event) {
    event.preventDefault();
    setLoading(true);
    localStorage.removeItem("userInfo");
      setUser(null);
    setLoading(false);
  }
  return (
    <>
      <button
        className="btn bg-inherit hover:bg-blue-700 mr-4 border-none"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        <div className="">
          <div className="w-10 rounded-full">
            <img src={user.pic} />
          </div>
        </div>
      </button>
      <dialog id="my_modal_1" className="modal text-center">
        <div className="modal-box bg-violet-800">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">
              ✕
            </button>
          </form>
          <div className="avatar m-auto">
            <div className="w-24 border-4 border-blue-400 rounded-full">
              <img src={user.pic} />
            </div>
          </div>
          <h3 className="font-bold text-2xl text-white mb-4">
            {user.username}
          </h3>
          <p className="font-thin text-sm text-blue-700">
            <span className=" text-white p-2 rounded-lg">{user.email}</span>
          </p>
          <div className="modal-action w-full">
            <form method="dialog" className="w-full">
              {/* if there is a button in form, it will close the modal */}

              <button
                className="btn border-amber-500 border-2 bg-inherit text-amber-300  hover:bg-amber-700 hover:border-amber-700 hover:text-white"
                onClick={logoutHandler}
                disabled={loading}
              >
                {loading? <span className="loading loading-dots loading-md"></span> : <><IoIosLogOut
                  className="font-bold"
                  style={{ height: "18px", width: "18px" }}
                  
                />
                <span style={{ marginBottom: "2px" }}> Logout</span></>}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default ProfileModal;
