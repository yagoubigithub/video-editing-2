const User = require("../models/User");
const Image = require("../models/Image");
const { errorHandler } = require("../helpers/dbErrorHandler");
const Jimp = require("jimp");

const jwt = require("jsonwebtoken"); //to generate sign token
const expressJwt = require("express-jwt"); // for authorization

var fs = require("fs");
var formidable = require("formidable");
const path = require("path");
const { v4: uuidv4 } = require("uuid");


exports.signup = (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then((user) => {
      user.salt = undefined;
      user.hashed_password = undefined;

      // generate a signed token with user id and secret
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

      //pressist the token as 't' in cookiewith ewpiry date
      res.cookie("t", token, { expire: new Date() + 9999 });
      // return token and user to frontend client

      const { _id, name, email, role } = user;
      return res.json({ token, user: { _id, name, email, role } });
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({
          err: errorHandler(err),
        });
      }
    });
};

exports.signin = (req, res) => {
  //find user based on email
  const { email, password } = req.body;

  console.log(req.body);
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          error: "User with that email doesn't exist ,Please signup",
        });
      }

      //if user is found make sure the email and password match

      // create authenticate method in user model

      if (!user.authenticate(password)) {
        return res.status(401).json({
          error: "Email and password don't match",
        });
      }
      // generate a signed token with user id and secret
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

      //pressist the token as 't' in cookiewith ewpiry date
      res.cookie("t", token, { expire: new Date() + 9999 });
      // return token and user to frontend client

      const { _id, name, email, role } = user;
      return res.json({ token, user: { _id, name, email, role } });
    })
    .catch(() => {
      return res.status(400).json({
        error: "User with that email doesn't exist ,Please signup",
      });
    });
};

exports.uploadImage = (req, res) => {
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
         Jimp.read(newPath, (err, img) => {
          if (err) throw err;
          img
            .resize(140, 140) // resize
           
            .write(newPath); // save

            
         fs.unlink(file.filepath, (err) => {
          if (err) throw err;

          _files.push(file);
          const data = {
            originalFilename :  file.originalFilename,
            filename : newName,
            type : file.mimetype,
            userId : req.params.userId
          }
          addImage(data).then(img=>{
            count--;
            if (count <= 0) {
              return res.json({ img });
             
             
            }
           
          }).catch(err=>{
            console.log(err)
          })
         
        });
        });

        

       });

    });


   })
}


exports.getImages = (req, res) => {
  const userId = req.params.userId;
  Image.find({userId}).then(images=>{
    res.status(200).json({images})
  })
}

addImage = ( data) => {
   const image = new Image(data);
 
   return image.save();
 };
exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout success" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"], // added later
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!user) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin resourse! Access denied",
    });
  }
  next();
};
