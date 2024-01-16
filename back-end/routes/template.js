const express = require("express");
const { create } = require("../controllers/template");
const router = express.Router();





router.post("/create/:userId/:videoId" ,  create);

 

module.exports = router;