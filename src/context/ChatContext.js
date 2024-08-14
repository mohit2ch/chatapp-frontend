import {createContext, useContext, useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ChatContext = createContext();


export default function ChatProvider({children}){
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("userInfo")) || null);
    const [selectedChat, setSelectedChat] = useState(null);
    const [chats, setChats] = useState([]);
    const [notifications, setNotifications] = useState([]);
    // console.log(JSON.parse(localStorage.getItem("userInfo")))
    
    return <ChatContext.Provider value={{user, setUser, selectedChat, setSelectedChat, chats, setChats, notifications, setNotifications}}>{children}</ChatContext.Provider>
}

export function useChatContext(){
    return useContext(ChatContext);
} 