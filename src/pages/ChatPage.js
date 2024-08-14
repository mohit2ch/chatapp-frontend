import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import MyChats from '../components/MyChats';
import { useChatContext } from '../context/ChatContext';

import axios from "axios";

function ChatPage(props) {
    const { chats, setChats, user } =
    useChatContext();
    const [loading, setLoading] = useState(false);
    async function fetchData() {
        setLoading(true);
        try {
          const data = await axios.get("/api/chat", {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          if (data.error) {
            throw new Error(data.error);
          }
          setChats(data.data);
          console.log(data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    useEffect(()=>{fetchData()}, []);
    return (
        <div className='h-full w-full bg-blue-300 overflow-y-auto'>
           <Header/>
           <MyChats loading={loading}/>
        </div>
    );
}

export default ChatPage;