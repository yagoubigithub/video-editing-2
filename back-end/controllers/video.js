var fs = require("fs");
var formidable = require("formidable");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const Video = require("../models/Video")

exports.upload = (req, res) => {
  const form = formidable({});
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ err });
    }
    const _files = [];
    let count = Object.keys(files).length;

    Object.keys(files).map((key, index) => {
      const file = files[key];
      const extention = path.extname(file.originalFilename);
      const newName = uuidv4() + extention;
      let newPath = path.join(__dirname, "..", "uploads", newName);
      let rawData = fs.readFileSync(file.filepath);

      console.log(file)
      fs.writeFile(newPath, rawData, function (err) {
        if (err) console.log(err);
        fs.unlink(file.filepath, (err) => {
          if (err) throw err;

          _files.push(file);
          const data = {
            originalFilename :  file.originalFilename,
            filename : newName,
            type : file.mimetype
          }
          addVideo(data).catch(err=>{
            console.log(err)
          })
          count--;
          if (count <= 0) {

            getAllVideos().then(videos=>{
              return res.json({ videos });
            })
           
          }
        });
      });
    });
  });
};

addVideo = ( data) => {
  const video = new Video(data);

  return video.save();
};

getAllVideos = () => {
  return Video.find();
};
exports.getAllVideos = getAllVideos


exports.getVideo = (req, res)=>{
  //res.sendFile(path.join(__dirname, ".." , "uploads", req.params.filename));


  const videoPath = path.join(__dirname, ".." , "uploads", req.params.filename); // Path to your video file
 console.log(videoPath)
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
}
