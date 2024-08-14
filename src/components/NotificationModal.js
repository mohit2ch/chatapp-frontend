import React from "react";
import { FaBell } from "react-icons/fa";
import { useChatContext } from "../context/ChatContext";

function NotificationModal(props) {
  const { notifications, setNotifications, setSelectedChat } = useChatContext();

    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
  function clickHandler(chat) {
    document.getElementById("notificationModal").close();
    console.log(chat);
    setNotifications(notifications.filter(function(message, index){
        return message.chat._id !== chat._id;
    }))
    setSelectedChat(chat);
  }

  return (
    <div>
      <button
        className="bg-inherit border-none text-gray-300 mr-4"
        onClick={() => document.getElementById("notificationModal").showModal()}
      >
        <FaBell style={{ height: "24px", width: "24px" }} />
      </button>
      <dialog id="notificationModal" className="modal">
        <div className="modal-box bg-blue-400">
          <h3 className="font-bold text-white text-xl">Notifications</h3>
          <div className="flex flex-col w-full mt-4 overflow-y-auto" style={{maxHeight:'400px'}}>
            {notifications.length > 0 ? (
              notifications.map(function (message) {
                // console.log(message);
                return (
                  <button
                    key={message._id}
                    className="bg-blue-600 hover:bg-blue-700 pb-2 rounded-lg text-white text-center w-full mb-1 p-2 border-white"
                    onClick={() => {
                        
                      clickHandler(message.chat);
                    }}
                  >
                    <span className="mb-2 block w-full text-center font-bold">
                      {message.sender.username}
                    </span>
                    <span className="text-sm text-blue-200">
                      {message.content}
                    </span>
                  </button>
                );

                // <div className="bg-inherit border-none text-white text-left w-full">
                //     <span className="mb-2 block w-full text-center">{message.sender.username}</span>
                //     <span>{message.content}{message.content}{message.content}</span></div>
              })
            ) : (
              <div className="w-full">
                {" "}
                <div className="btn w-full btn-primary border-none no-animation text-blue-200">
                  All caught up!
                </div>
              </div>)
              
                
              
            }
            
          </div>
          <div className="modal-action">
            <form method="dialog" className="w-full">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn bg-blue-500 mr-4 text-white border-none" onClick={(event)=>{
                event.preventDefault();
                setNotifications([]);
              }}>
                Clear Notifications
              </button>
              <button className="btn btn-error text-white border-none">
                Close
              </button>
              
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default NotificationModal;
