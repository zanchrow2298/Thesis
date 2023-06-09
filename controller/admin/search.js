const express = require('express')
const User = require('../../models/registration')
const Admin = require('../../models/Admin')
var awsConfig = require('aws-config');
var AWS = require('aws-sdk');
const object = require('2/object');
const FILE = require('../../models/fileupload')

exports.getall = async function (req, res) {
  User.find({}, function (err, users) {
    if (err) {
      console.log(err)
    }
    res.json(users)
  }).sort({ status: 'asc' });
};

//user search
exports.search = async (req, res) => {
  // const email = req.params.email
  // const lName = req.params.lName
  // const fName = req.params.fName
  // const pNumber = req.params.pNumber
  // const date = req.params.date

  try {
    const findname = req.params.fName;

    const objs = await User.find({ fName: { $regex: findname, $options: 'i' } });
    res.json(objs);
  }
  catch (error) {
    res.json({ message: error });
  }
}

exports.getbyID = async (req, res) => {

  const _id = req.params._id
  await User.findById({ _id }, function (err, user) {
    if (err) {
      res.status(200).json({ message: err })
    } else {
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
exports.page = async function (req, res) {

  let pageSize = parseInt(req.params.pageSize);
  var pageNo = (parseInt(req.params.pageNo) - 1) * parseInt(pageSize)
  const count = await User.estimatedDocumentCount()
  User.find({}, function (err, users) {
    if (err) {
      console.log(err)
    }
    res.json([{ users, count }])
  }).skip(pageNo).limit(pageSize).sort({ status: 'asc' });
};

exports.page1 = async (req, res) => {

  try {
    // const pageno = parseint(req.params.pageno)
    let total = parseInt(req.params.total);
    var pageno = (parseInt(req.params.pageno) - 1) * parseInt(total)
    const search = req.params.search;

    const objs = await User.find({ fName: { $regex: search, $options: 'i' } }).skip(pageno).limit(total);
    res.json(objs);
    console.log(objs)
  }
  catch (error) {
    res.json({ message: error });
  }
}

exports.pageadmin = async function (req, res) {

  let adminpageSize = parseInt(req.params.adminpageSize);
  var adminpageNo = (parseInt(req.params.adminpageNo) - 1) * parseInt(adminpageSize)
  const count = await Admin.estimatedDocumentCount()
  Admin.find({}, function (err, users) {
    if (err) {
      console.log(err)
    }
    res.json([{ users, count }])
  }).skip(adminpageNo).limit(adminpageSize).sort({ status: 'asc' });
};

// s3-bucket-getall
exports.GETS3 = async function (req, res) {

  const page = req.params.page
  const limit = 5
  const startIndex = (page - 1) * limit
  const endIndex = page * limit


  // let nextContinuationToken = null
  var params = {
    Bucket: process.env.AWS_BUCKET,
    MaxKeys: process.env.AWS_MAXKEYS

  };
  var s3 = new AWS.S3({});
  s3.listObjectsV2(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // console.log(data.KeyCount)
    const keycount = data.KeyCount
    const object = data.Contents
    //  console.log(object)
    // console.log(object.Key)
    results = object.slice(startIndex, endIndex)

    result = results.sort()
    // console.log(result)
    res.status(200).json({ result, keycount })
  }
  )
}
//search on s3bucket
exports.getone1 = async function (req, res) {
  var keywordfile = req.params.keywordfile

  const page = req.params.page
  const limit = req.params.limit
  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  var s3 = new AWS.S3({});

  var options = {
    Bucket: process.env.AWS_BUCKET,
    Prefix: keywordfile
  };

  s3.listObjectsV2(options, function (err, data) {
    // res.attachment(file);

    const keycount = data.KeyCount
    const object = data.Contents

    result = object.slice(startIndex, endIndex)
    res.status(200).json({ result, keycount })
  });
}

exports.delete = async (req, res) => {
  var s3 = new AWS.S3({});
  const FileName = req.body.FileName
  // for(let i = 0 ; i <= delkeywordfile.length; i++){
  var params = {
    Bucket: process.env.AWS_BUCKET,
    Key: FileName
    // }
  }

  FILE.findOneAndDelete({FileName}, async(err,data)=>{
    return (err ? "Error" : "Deleted")
  })



  s3.deleteObject(params, function (err, data) {
    if (err) { console.log(err, err.stack); } // an error occurred
    else
      res.status(200).json({ result: `${FileName} Deleted Successfully` })           // successful response
  });
}


   //get request on mongodb

  // exports.GETMONGOS3 = async(req,res)=>{

  // }

  // Search function in mongodb
  exports.filesearch = async (req, res) => {
   
  
    try {
      const FileName = req.body.filename
      const objs = await FILE.find({ FileName: { $regex:filename , $options: 'i' } });
      res.json(objs);
    }
    catch (error) {
      res.json({ message: error });
    }
  }