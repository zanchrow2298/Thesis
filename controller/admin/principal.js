const ADMIN = require('../../models/Admin');
const USER = require('../../models/registration');

exports.principalUser = (req,res) =>{
    ADMIN.find({},function(err,user){
        if(err){
            res.status(200).json({message:"Error"})
        }else{
            res.status(200).json({user})
        }
    })
}

exports.principalAdmin = (req,res) =>{
    USER.find({},function(err,admin){
        if(err){
            res.status(200).json({message:"Error"})
        }else{
            res.status(200).json({admin})
        }
    })
}