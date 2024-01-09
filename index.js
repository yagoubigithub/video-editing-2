
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

const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator")
const bodyParser = require('body-parser')

const morgan  =   require("morgan");


dotenv.config()



const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cookieParser());
app.use(expressValidator())

const port = process.env.PORT || 3001;
app.use(morgan());
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
const userRoute = require("./back-end/routes/user")
app.use("/api/videos",videoRoutes)
app.use("/api/merge",mergeRoutes)
app.use("/api/users",userRoute)


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
  
const io = socketio(server , {
  cors: {
    origin: "http://localhost:3000"
  }
});
  
const sockets = {}

  io.on("connection", (socket) => {
    console.log("New connection");
    socket.on("connectInit", (sessionId) => {
      // The socket ID is stored along with the unique ID generated by the client
      sockets[sessionId] = socket.id
      // The sockets object is stored in Express so it can be grabbed in a route
      app.set("sockets", sockets)
    })

 
  });
  
  
  app.set("io", io)
