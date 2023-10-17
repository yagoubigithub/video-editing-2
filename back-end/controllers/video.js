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

      fs.writeFile(newPath, rawData, function (err) {
        if (err) console.log(err);
        fs.unlink(file.filepath, (err) => {
          if (err) throw err;

          _files.push(file);
          const data = {
            originalFilename :  file.originalFilename,
            filename : newName
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
