const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const validator = require('validator')

const fileSchema = mongoose.Schema({
    uid: { type: Number, index: true },
    name: { type: String, required:true },
    path: { type:String, required:true, unique: true },
    user: { type: String, required: true},
    mtime: { type: Date, default: Date.now },
    status: {type: String },
    image:{type:String}
    //output: {type: mongoose.Schema.Types.ObjectId, ref: "Output"}
});
