const express = require('express');
const upload = require('../../middleware/s3-bucket');
const S3BUCKET = require('../../controller/admin/search')
const router = express.Router();
const File = require('../../models/fileupload')
var awsConfig = require('aws-config');
var AWS = require('aws-sdk');


router.post('/v1/upload', upload.array('file', 1), (req, res) => {
// const current = new Date()
  
// const data = new File({
//     name:req.file,
//     Bloodtype:req.body.Bloodtype,
//     TimeStamp:current.toLocaleString()

// })
// data.save()
// console.log(data)

    res.send({ file: req.file, message:"Successful" });
  });

router.get('/getall/:page',S3BUCKET.GETS3)




//getting file inside s3bucket
router.get('/export/:page/:limit/:keywordfile',S3BUCKET.getone1);

router.delete('/delete',S3BUCKET.delete)



module.exports = router;