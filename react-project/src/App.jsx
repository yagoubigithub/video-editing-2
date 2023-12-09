import { useState ,useEffect } from "react";
import "./fonts.css"
import "./resizing.css"
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from "./components/Sidebar";
import { socket } from './socket';

import { TextProvider } from "./context/TextContext"
import Video from "./components/Video";





function App() {
  

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [progress, setProgress] = useState(100);
  
  useEffect(() => {

    const thisSessionId = Math.random().toString(36).substr(2, 9);

    localStorage.setItem("thisSessionId",thisSessionId )
    socket.emit('connectInit', thisSessionId);

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onProgressEvent(value) {
      if(!isNaN(value)){
        setProgress(value)
      }

     console.log("value , value" , value)
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('progress', onProgressEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('progress', onProgressEvent);
    };
  }, []);

  return (
    <div >
      <TextProvider >
        <Navbar />
        <div id="progress" style={{width : progress + "vw"}}></div>

      <div id="content">
      <Sidebar></Sidebar>
        <Video />
      </div>

      </TextProvider>


    </div>
  );
}

export default App;
