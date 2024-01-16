const express = require("express");
const { create , getAll } = require("../controllers/template");
const router = express.Router();





router.post("/create/:userId/:videoId" ,  create);
router.get("/get/:userId" ,  getAll);
 

module.exports = router;