const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
const uuid = require('uuid')
var awsConfig = require('aws-config');
const express = require('express')
const router = express.Router();
dotenv.config();


aws.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
  region: 'ap-southeast-1',
  signatureVersion: 'v4'
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
  }
};

const upload = multer({
  fileFilter: fileFilter,
  storage: multerS3({
    acl: 'private',
    s3,
    bucket: 'aionco-s3-bucket',
    key: function(req, file, cb) {
      console.log(1)
      /*uuid to make sure my file has a unique name*/
      req.file = uuid.v1() + file.originalname;
      cb(null, uuid.v1() + file.originalname);
    }
  })  
});

router.get('/export', function(req, res, next) {
  console.log('Trying to download file', fileKey);

  var s3 = new AWS.S3({});

  var options = {
      Bucket: 'aionco-s3-bucket',
      Key: key
  };

  s3.getObject(options, function(err, data) {
    res.attachment(file);
    res.send(data.Body);
});
});

module.exports = upload;
