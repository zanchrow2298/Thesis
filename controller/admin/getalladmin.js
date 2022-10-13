const express = require('express')
const User = require('../../models/registration')

exports.getall = async function(req, res) {
    User.find({}, function(err, users) {
      if(err){
        console.log(err)
      }
      res.json(users)
    });
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

// exports.getall = async function(req, res) {
//     User.find({}, function(err, users) {
//       var userMap = {};
  
//       users.forEach(function(user) {
//         userMap[user._id] = user;
//       });
  
//       res.send(userMap);  
//     });
//   };