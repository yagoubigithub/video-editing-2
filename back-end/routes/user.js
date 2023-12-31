const express = require("express");
const router = express.Router();


const {signup, signin, signout, requireSignin, uploadImage  ,getImages} = require("../controllers/user")

const {userSignupValidator} = require("../validator")

router.post("/signup",userSignupValidator, signup);
router.post("/signin", signin);
router.post("/upload/:userId",requireSignin, uploadImage);
router.get("/signout", signout);
router.get("/images/:userId", getImages);


module.exports = router;