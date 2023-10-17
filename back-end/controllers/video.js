

var fs = require("fs"); 
var formidable = require("formidable"); 
const path = require("path");
const { v4: uuidv4 } = require('uuid');


exports.upload = (req, res ) => {
    const form = formidable({});
    form.parse(req, (err, fields, files) => {
        if (err) {
         
          return res.status(500).json({err})
        }
        const _files = []
        let count = Object.keys(files).length

        Object.keys(files).map((key , index)=>{
            const file = files[key]
            const extention = path.extname(file.originalFilename)
            const newName = uuidv4()  + extention
            let newPath = path.join(__dirname  ,"..", "uploads" , newName )
            let rawData = fs.readFileSync(file.filepath)

            fs.writeFile(newPath, rawData, function (err) {
                if (err) console.log(err)
                fs.unlink(file.filepath, err => {
                  if (err) throw err
        
                  _files.push(file) 
                  count--;
                  if(count <= 0){
                   return  res.json({ fields, _files });
                  }
                   
                   
              
              })
            })

         
        })

        
      });



    

};
