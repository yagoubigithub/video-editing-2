
const Template = require("../models/Template");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {

    const template = new Template({...req.body , userId : req.params.userId  ,videoId : req.params.videoId});


   // console.log({...req.body , userId : req.params.userId  ,videoId : req.params.videoId})
    template
    .save()
    .then((template) => {
   
      return res.status(200).json({success : true});
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({
          err: errorHandler(err),
        });
      }
    });
}