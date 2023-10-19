const express = require("express");
const { upload, getAllVideos , getVideo } = require("../controllers/video");
const router = express.Router();





router.post("/upload" ,  upload);
router.get("/uploads/:filename/:type" ,  getVideo);
router.get("/" , (req, res)=>  getAllVideos().then(videos=>{

    return res.json({videos})
}));
  
 

module.exports = router;