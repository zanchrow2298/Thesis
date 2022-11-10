const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const validator = require('validator')

const fileSchema = mongoose.Schema({
    
    FileName: { type: String},
    NewProfile:{type:String},
    Bloodtype:{type:String},
    TimeStamp:{type: Date, default:new Date().toISOString()},
    CaptureKit:{type:String},
    Regex:{type:String},
    SampleID:{type:String},
    SpecimenType:{type:String,text:true},
    DataType:{type:String},
    CancerType:{type:String},
    SequenceType:{type:String},
    Site:{type:String}
    //output: {type: mongoose.Schema.Types.ObjectId, ref: "Output"}
});
module.exports = mongoose.model('fileupload', fileSchema);
