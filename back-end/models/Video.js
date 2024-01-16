const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const VideoSchema = new mongoose.Schema(
  {

    filename: {
      type: String,
      required: true,
    },
    originalFilename: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    userId: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", VideoSchema);
module.exports = Video