import './App.css';
import io from 'socket.io-client';
import {useState} from "react";
import Chat from './components/Chat.js'
import { motion } from 'framer-motion';
const socket = io.connect("http://localhost:3001");


function App() {

  const [Username, setUsername] = useState("");
  const [Room, setRoom] = useState("");
  const [showChat, setshowChat] = useState(false);



  const joinRoom = () => {
    if (Username !== "" && Room !== "") {
      socket.emit("join_room", Room)
      setshowChat(true);
    }
  }

  return (
    <div className="App">
      {!showChat ? (
      <div className="joinChatContainer">
      <motion.h3 animate={{opacity: 1}} initial={{opacity: 0}}>Join room</motion.h3>
      <motion.input whileFocus={{scale: 1.1}} type="text" placeholder="your name" onChange={(e) => {setUsername(e.target.value)}}/>
      <motion.input whileFocus={{scale: 1.1}} type="text" placeholder="room id " onChange={(e) => {setRoom(e.target.value)}}/>
      <motion.button 
        onClick={joinRoom}
        whileHover={{scale: 1.1}}
        whileTap={{scale: 0.9}}
        >
        Join room
        </motion.button>
      </div>
      ) : (

      <Chat socket={socket} username={Username} room={Room}></Chat>
      )}
      
    </div>
  

  );
}

export default App;
