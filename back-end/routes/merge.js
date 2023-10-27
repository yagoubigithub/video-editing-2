const express = require("express");
const { merge } = require("../controllers/merge");
const router = express.Router();





router.post("/" ,  merge);


module.exports = router;
