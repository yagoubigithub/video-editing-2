
const exec = require("child_process").exec;
const spawn = require("child_process").spawn;

const socketio = require("socket.io");

const dotenv = require("dotenv");

const path = require("path");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const formidable = require("formidable");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');



dotenv.config()



const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
const port = process.env.PORT || 3000;
//app.use(morgan());
app.use(express.static("front-end"));
app.use(express.static("back-end/uploads"));

console.log("db-url :" , process.env.MONGO_URL)

mongoose.connect(process.env.MONGO_URL,{

  useNewUrlParser : true
}).then(()=>{
  console.log("database connected")
}).catch(Err=>{
  console.log(Err)
})


//routes
const videoRoutes = require("./back-end/routes/videos")
const mergeRoutes = require("./back-end/routes/merge")
app.use("/api/videos",videoRoutes)
app.use("/api/merge",mergeRoutes)

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "front-end", "index.html"));
  });

  app.get("/download", function (req, res) {
    const file = `${__dirname}/output.mp4`;
    res.download(file); // Set disposition and send it.
  });
  

  
const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  
  const io = socketio(server);
  
  io.on("connection", (socket) => {
    console.log("New connection");
    mySoket = socket;
  });
  