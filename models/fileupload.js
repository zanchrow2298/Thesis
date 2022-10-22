const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const validator = require('validator')

const fileSchema = mongoose.Schema({
    
    name: { type: String},
    Bloodtype:{type:String},
    TimeStamp:{type: String}
    //output: {type: mongoose.Schema.Types.ObjectId, ref: "Output"}
});
module.exports = mongoose.model('fileupload', fileSchema);
