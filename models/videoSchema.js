const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
link: {type: String},
});



module.exports = mongoose.model("Video", videoSchema);
