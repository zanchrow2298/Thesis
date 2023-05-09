const File = require("../../models/fileupload");
const AWS = require("aws-sdk");
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
const USERFILE = require('../../models/userupload')
const FILEUPLOAD = require('../../models/fileupload')
const ANNOUCEMENT = require('../../models/announcement')
const REGISTRATION = require('../../models/registration')

exports.s3view = async (req, res) => {
  
    
  
    try {
     
        const Filename = req.query.Key;
      // Set the S3 getObject parameters
      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: Filename,
      };
  
      // Get the image data from S3
      const s3Stream = await s3.getObject(params).createReadStream();
      console.log('Someone viewed the file')
      s3Stream.pipe(res)
    } catch (err) {
      res.status(200).json({ message: "Something went wrong!" });
    }
  }

  exports.getusersubj = (req,res)=>{
    const NewProfile = req.params.newprofile;
    const filename = req.params.filename;
    try{
    USERFILE.find({NewProfile:NewProfile,filename:filename}). 
    then(data =>{
      console.log(data)
      res.status(200).json({result:data})
  
    })
   
  }catch(err){
    res.status(200).json({message:err})
  }
  }

  //for file tags
exports.filter = async (req, res, next) => {
  const current = new Date();
  var day = current.getDate();
  var month = current.getMonth();
  var year = current.getFullYear();
  var stamp = day + "/" + month + "/" + year;
  console.log(stamp);
  const data = new USERFILE({
    FileName: req.file,
    // TimeStamp: ,
    start_date: req.body.start_date,
    NewProfile: req.body.newprofile,
    end_date: req.body.end_date,
    instructions: req.body.instructions,
    fName: req.body.fName,
    lName: req.body.lName,
    remarks: req.body.remarks,
    filename:req.body.filename
    
  });
  console.log(data)

  if (
    data.NewProfile
   
   ) {
    data.save();
    res.status(200).json(data);
    console.log(data);
  } else {
    console.log("asdasd")
    res.status(200).json({ message: "Please fill out the form" });

  }
};


exports.downloads3 = function (req, res, next) {
  // download the file via aws s3 here
  var fileKey = req.query["fileKey"];

  console.log("Trying to download file", fileKey);

  AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  var s3 = new AWS.S3();
  var options = {
    Bucket: process.env.AWS_BUCKET,
    Key: fileKey,
  };

  res.attachment(fileKey);
  var fileStream = s3.getObject(options).createReadStream();
  fileStream.pipe(res);
};


exports.viewall = async(req,res)=>{
  let pageSize = 5;
  var pageNo = (parseInt(req.params.pageNo) - 1) * parseInt(pageSize);
  const count = await ANNOUCEMENT.estimatedDocumentCount();
  ANNOUCEMENT.find({status:"Active"})
  .sort({"TimeStamp": -1})
  .skip(pageNo)
  .limit(pageSize)
  .then(result=>{
    res.status(200).json({result,count})
  })
}


exports.deleteall = async(req,res)=>{
 
  USERFILE.deleteMany({})
  .then((result) => {
    console.log(`Deleted ${result.deletedCount} documents`);
  })
  .catch((err) => {
    console.log(`Error deleting documents: ${err}`);
  });
}


exports.viewactivity = (req,res)=>{
  const {fName, lName,NewProfile} = req.body;
  USERFILE.find({fName,lName,NewProfile}). 
  then(result=>{
    res.status(200).json({result})
  })
  

}




exports.downloads3 = function (req, res, next) {
  // download the file via aws s3 here
  var fileKey = req.query["fileKey"];

  console.log("Trying to download file", fileKey);

  AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  var s3 = new AWS.S3();
  var options = {
    Bucket: process.env.AWS_BUCKET,
    Key: fileKey,
  };

  res.attachment(fileKey);
  var fileStream = s3.getObject(options).createReadStream();
  fileStream.pipe(res);
};