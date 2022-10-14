const express = require('express')
const User = require('../../models/registration')
const Admin = require('../../models/Admin')

exports.getall = async function(req, res) {
    User.find({}, function(err, users) {
      if(err){
        console.log(err)
      }
      res.json(users)
    }).sort({status:'asc'});
  };

  exports.search = async (req, res) => {
    // const email = req.params.email
    // const lName = req.params.lName
    // const fName = req.params.fName
    // const pNumber = req.params.pNumber
    // const date = req.params.date

    try {
      const findname = req.params.fName;

      const objs = await User.find({fName:{ $regex:findname,$options:'i'} });
      res.json(objs);
    } 
    catch (error) {
      res.json({message: error});        
    }
}  

exports.getbyID = async (req, res) => {

  const _id = req.params._id
  await User.findById({_id}, function(err,user){
    if (err){
      res.status(200).json({message:err})
    }else{
      res.status(200).json(user)
    }
  })
}

// exports.getall = async function(req, res) {
//     User.find({}, function(err, users) {
//       var userMap = {};
  
//       users.forEach(function(user) {
//         userMap[user._id] = user;
//       });
  
//       res.send(userMap);  
//     });
//   };

//pagination
exports.page = async function(req, res) {

  let pageSize = parseInt(req.params.pageSize);
  var pageNo = (parseInt(req.params.pageNo)-1) * parseInt(pageSize)
  const count = await User.estimatedDocumentCount()
    User.find({}, function(err, users) {
      if(err){
        console.log(err)
      }
      res.json([{users,count}])
    }).skip(pageNo).limit(pageSize).sort({status:'asc'});
  };

exports.page1 = async (req, res) => {

    try {
      // const pageno = parseint(req.params.pageno)
      let total = parseInt(req.params.total);
      var pageno = (parseInt(req.params.pageno)-1) * parseInt(total)
      const search = req.params.search;

      const objs = await User.find({fName:{ $regex: search,$options:'i'} }).skip(pageno).limit(total);
      res.json(objs);
      console.log(objs)
    } 
    catch (error) {
      res.json({message: error});        
    }
}

exports.pageadmin = async function(req, res) {

  let pageSize = parseInt(req.params.pageSize);
  var pageNo = (parseInt(req.params.pageNo)-1) * parseInt(pageSize)
  const count = await Admin.estimatedDocumentCount()
    Admin.find({}, function(err, users) {
      if(err){
        console.log(err)
      }
      res.json([{users,count}])
    }).skip(pageNo).limit(pageSize).sort({status:'asc'});
  };