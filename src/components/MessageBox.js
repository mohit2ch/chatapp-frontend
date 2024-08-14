import React from 'react';
import { useChatContext } from '../context/ChatContext';
import ChatBox from './ChatBox';

function MessageBox(props) {
    const {selectedChat} = useChatContext();
    // console.log(selectedChat);
    return (
        <div className='h-full grow flex justify-center items-center rounded-lg bg-blue-500 ml-2 p-4' style={{height:'80vh'}}>
            {selectedChat ? <ChatBox/> : <div className='text-blue-200 text-2xl'>Start a conversation!</div>
}</div>
    );
}

export default MessageBox;