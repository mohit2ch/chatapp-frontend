import React from "react";
import Sidebar from "./Sidebar";

import { Link, useLocation } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import NotificationModal from "./NotificationModal";
function Header(props) {
  const location = useLocation();
  //   console.log(location.pathname);
//   console.log(document.getElementById("my-drawer").value);
  return (
    <div className="navbar bg-blue-600 shadow-md flex justify-between">
      {location.pathname === "/" ? (
        <Link to={"/chat"}>
          <button className="btn bg-blue-500 border-none font-bold text-gray-200 hover:bg-blue-700">
            Go to Chats
          </button>
        </Link>
      ) : (
        <Sidebar />
      )}
      <div>
        <button className="bg-inherit border-none text-gray-300 mr-4">
          <NotificationModal/>
        </button>
        <ProfileModal />
      </div>
    </div>
  );
}

export default Header;
