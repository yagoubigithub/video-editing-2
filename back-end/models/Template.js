const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const TemplateSchema = new mongoose.Schema(
  {
    videoId: { type: ObjectId, ref: "Video" },
    userId: { type: ObjectId, ref: "User" },
    
    name : {
        type : String,
        required : true,
    }
    ,
    texts : {
        type : Array,
        default : [],
    }
  },
  { timestamps: true }
);

const Template = mongoose.model("Template", TemplateSchema);
module.exports = Template