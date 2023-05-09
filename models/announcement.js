const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const validator = require('validator')

const annoucement = mongoose.Schema({
    
    FileName: { type: String},
    start_date:{type:String},
    TimeStamp:{type: Date, default:new Date().toISOString()},
    end_date:{type:String},
    Detail:{type:String},
    announcementtitle:{type:String},
    status:{type:String, default:"Active"}
    

    //output: {type: mongoose.Schema.Types.ObjectId, ref: "Output"}
});
module.exports = mongoose.model('announcement', annoucement);
