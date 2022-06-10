import React, { useEffect } from 'react';
import { useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import {motion} from 'framer-motion'





const Chat = ({socket, username, room}) => {

    const [currentMessage, setcurrentMessage] = useState("")
    const [messageList, setmessageList] = useState([]);

    
    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() 
            }
            
            await socket.emit("send_message", messageData)
            setmessageList((list) => [...list, messageData]);
            setcurrentMessage("");

        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data)
            setmessageList((list) => [...list, data]);
        })
    }, [socket])
    

    return (  
        <div className='chat-window'>
            <div className="chat-header">
                <p>Chat is Live</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className='message-container'>
                {messageList.map((messageContent) => {
                    return <div className="message" id={username === messageContent.author ? "you" : "other"}>
                        <div className="">
                            <div className="message-content" >

                                <p>{messageContent.message}</p>
                            </div>
                            <div className="message-meta">
                                <p id='time'>{messageContent.time}</p>
                                <p id='author'>{messageContent.author}</p>
                            </div>
                        </div>
                    </div>
                })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input value={currentMessage} onKeyPress={(e) => {e.key === "Enter" && sendMessage()}} type="text" placeholder='message...' onChange={(e) => {
                    setcurrentMessage(e.target.value)
                }}/>
                <motion.button onClick={sendMessage}>Send</motion.button>
            </div>
        </div>
    );
}
 
export default Chat;