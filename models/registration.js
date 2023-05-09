const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const validator = require('validator')

const registrationSchema = mongoose.Schema({

    email: { type: String, validate: [validator.isEmail, "Please register a valid email"] },
    // email: { type: String},
    password: { type: String,$regex:`^` },
    fName: { type: String },
    lName: { type: String },
    pNumber: { type: String },
    date: { type: String },
    code: {type:String},
    status: {type: String, default:"Inactive"},
    roles: {type:String, default:"User"},
    AralingPanlipunan:{type:Number},
    Math:{type:Number},
    Science:{type:Number},
    English:{type:Number},
    Mapeh:{type:Number},
    Tle:{type:Number},
    Filipino:{type:Number},
    Esp:{type:Number}


    
});


registrationSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashed = await bcrypt.hash(this.password, 10);
        this.password = hashed;
    } catch (err) {
        return next(err);
    }
});

registrationSchema.pre('findOneAndUpdate', async function (next) {
    try {
        if (this._update.password) {
            const hashed = await bcrypt.hash(this._update.password, 10)
            this._update.password = hashed;
        }
        next();
    } catch (err) {
        return next(err);
    }
});

registrationSchema.methods.isValidPassword = async function (password) {
    const user = this;
    console.log(user); console.log(password);
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

registrationSchema.methods.isValidPassword = async function (password) {
    const user = this;
    console.log(user); console.log(password);
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}
module.exports = mongoose.model('registration', registrationSchema);