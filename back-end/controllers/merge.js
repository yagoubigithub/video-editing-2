const fs = require("fs");
const exec = require("child_process").exec;
const spawn = require("child_process").spawn;

const path = require("path");

exports.merge = (req, res) => {
  const { file, data } = req.body;

  fs.unlink("./output.mp4", (err) => {
    if (err) console.log(err);
    let cmd_input = []
    let cmd_filter_complex = []
    const tempImages = [];
    data.map((text, index) => {
      const { from, to, imgBase64, left, top } = text;
      const base64Data = imgBase64.replace(/^data:image\/png;base64,/, "");
      const imageName =`image-${index}.png`;
      cmd_input.push( `-i`)
      cmd_input.push( `./temps/${imageName}`)
      cmd_filter_complex.push(`[${index  === 0 ? 0 : "v" + (index )}][${index + 1}]overlay=x=${left}:y=${top}:enable='between(t,${from},${to})'[v${index+1}];`)
      fs.writeFile(
        `./temps/${imageName}`,
        base64Data,
        "base64",
        function (err) {
          if (err) {
            console.log(err);
          }
  
          tempImages.push(`image-${index}.png`);
        }
      );
    });
   
   
    const cmd = [  "-i",
    `./back-end/uploads/${file.filename}`,...cmd_input ,  "-filter_complex",  Array.from(cmd_filter_complex.join(" ")).slice(0, -1).join("")  , "-map" , `[v${data.length}]` , "-map" , "0:a" ,  "output.mp4",
    "-progress",
    "pipe:1"]
  
    console.log(cmd.join(" "))
    const cmd_ffprobe = `ffprobe -v error -select_streams v:0 -count_packets -show_entries stream=nb_read_packets -of csv=p=0 ./back-end/uploads/${file.filename}`;
  
    
    exec(cmd_ffprobe, (err, stdout, stderr) => {
      if (err) {
        res.json({ error: err.message });
  
        throw err;
      }
  
      const frameNumbers = parseInt(stdout);
  
      const ffmpeg = spawn("ffmpeg", cmd);
      ffmpeg.stdout.on("data", (data) => {
        console.log(`stdout: ${data}`);
      });
  
      ffmpeg.on("close", (code) => {
        console.log(`child process exited with code ${code}`);
        res.json({ success: true });
      });
  
      ffmpeg.stderr.on("data", (data) => {
        console.log(data.toString());
  
      })
  
  
  
    })

  })
 


};

