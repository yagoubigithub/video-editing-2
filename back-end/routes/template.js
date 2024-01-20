const express = require("express");
const { create , getAll  , getOne } = require("../controllers/template");
const router = express.Router();





router.post("/create/:userId/:videoId" ,  create);
router.get("/get/:userId" ,  getAll);
router.get("/getone/:templateId" ,  getOne); 

module.exports = router;