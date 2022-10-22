const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
const uuid = require('uuid')
var awsConfig = require('aws-config');
const express = require('express');
const { LexModelBuildingService } = require('aws-sdk');
const router = express.Router();
dotenv.config();


aws.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
  signatureVersion: process.env.AWS_SIGNATUREVERSION
});

const s3 = new aws.S3();
//mimetype/ filter for the file to be uploaded, still trying to find the mimetype for fastq and bam bioinformatics

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'application/zip' || file.mimetype === 'application/x-fasta') {
//     cb(null, true);
//   } else {
//     cb(new Error('Wrong file type'), false);
//   }
// };

const upload = multer({
  // fileFilter: fileFilter,
  storage: multerS3({
    acl: process.env.AWS_ACL,
    s3,
    bucket: process.env.AWS_BUCKET,
    key: function(req, file, cb) {
      // console.log(1)
      /*uuid to make sure the file has a unique name*/
      req.file =/* uuid.v1() + */file.originalname.toLowerCase();
      cb(null,/* uuid.v1() +*/file.originalname.toLowerCase());
    }
  })  
  

});





module.exports = upload;
