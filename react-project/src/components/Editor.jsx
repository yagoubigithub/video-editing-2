import { useState, useEffect } from "react";

import Navbar from './Navbar';
import Sidebar from "./Sidebar";
import { socket } from '../socket';


import Video from "./Video";





function Editor() {


    const [isConnected, setIsConnected] = useState(socket.connected);
    const [progress, setProgress] = useState(100);

    useEffect(() => {

        localStorage.setItem("emoji" , "{}")
        const thisSessionId = Math.random().toString(36).substr(2, 9);

        localStorage.setItem("thisSessionId", thisSessionId)
        socket.emit('connectInit', thisSessionId);

        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onProgressEvent(value) {
            if (!isNaN(value)) {
                setProgress(value)
            }

            console.log("value , value", value)
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

         
                <Navbar />
                <div id="progress" style={{ width: progress + "vw" }}></div>

                <div id="content">
                    <Sidebar></Sidebar>
                    <Video />
                </div>

      


        </div>
    );
}

export default Editor;
