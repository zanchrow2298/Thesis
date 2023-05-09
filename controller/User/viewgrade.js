const USER = require('../../models/registration')

exports.viewgrade = (req,res) =>{
    const _id = req.params._id;
    USER.findById({_id},function(err,result){
        if(err){
            res.status(200).json({message:err})
        }else{
            res.status(200).json({result})
        }
    })
}


exports.VIEWGRADE1 = (req,res)=>{

    USER.find({}). 
    then(result=>{
        res.status(200).json(result)
    })
}


exports.viewgrade2 = (req,res) =>{
   
    const fName = req.params.fName
    const  lName = req.params.lName
    USER.find({fName:fName, lName:lName},function(err,result){
        if(err){
            res.status(200).json({message:err})
        }else{
            res.status(200).json({result})
        }
    })
}