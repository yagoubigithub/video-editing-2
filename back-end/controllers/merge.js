const fs = require("fs");
const exec = require("child_process").exec;
const spawn = require("child_process").spawn;

const path = require("path");



exports.merge = (req, res) => {
  
    const {from , to , file , imgBase64} = req.body;

    fs.unlink("./output.mp4", (err) => {
        if (err) console.log(err);
        const base64Data = imgBase64.replace(
          /^data:image\/png;base64,/,
          ""
        );
        fs.writeFile("image.png", base64Data, "base64", function (err) {
          if (err) {
            console.log(err);
          }



        })


    })
  };
  