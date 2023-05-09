const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const validator = require('validator')

const fileSchema = mongoose.Schema({
    
    FileName: { type: String},
    NewProfile:{type:String},
    start_date:{type:String},
    TimeStamp:{type: Date, default:new Date().toISOString()},
    end_date:{type:String},
    instructions:{type:String},
    fName:{type:String},
    lName:{type:String},
    remarks:{type:String},
    filename:{type:String},
    grade:{type:Number}

    //output: {type: mongoose.Schema.Types.ObjectId, ref: "Output"}
});
module.exports = mongoose.model('fileupload1', fileSchema);
