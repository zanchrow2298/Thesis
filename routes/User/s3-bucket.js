const express = require('express');
const upload = require('../../middleware/s3-bucket');
const S3BUCKET = require('../../controller/admin/search')
const router = express.Router();
var awsConfig = require('aws-config');
var AWS = require('aws-sdk');


router.post('/v1/upload', upload.array('file', 1), (req, res) => {
    res.send({ file: req.file, message:"Successful" });
  });

router.get('/getall/:page',S3BUCKET.GETS3)




//getting file inside s3bucket
router.get('/export/:page/:limit/:keywordfile',S3BUCKET.getone1);

router.delete('/delete',S3BUCKET.delete)


module.exports = router;