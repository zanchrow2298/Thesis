const express = require('express');
const upload = require('../../middleware/s3-bucket');
const S3BUCKET = require('../../controller/admin/search')
const router = express.Router();
const S3FILE = require('../../controller/admin/filter')
const VIEW = require('../../controller/User/view')
const VIEWGRADE = require('../../controller/User/viewgrade')

//upload to s3bucket
router.post('/v1/upload', upload.array('file',1),S3FILE.filter, (req, res) => {
  console.log(1)

    res.send({ file: req.file, message:"Successful" });
  });

  //s3getall
router.get('/getall/:page',S3BUCKET.GETS3)
router.post('/filter',S3FILE.filter)


//getting file inside s3bucket
// router.get('/export/:page/:limit/:keywordfile',S3BUCKET.getone1);

router.get('/s3admin/:s3pageNo',S3FILE.GETMONGO )

router.delete('/delete',S3BUCKET.delete)

router.get('/view',VIEW.s3view)

router.get('/getstudentsubject/:newprofile/:filename',VIEW.getusersubj)

router.post('/userfile', upload.array('file',1),VIEW.filter, (req, res) => {
  console.log(1)

    res.send({ file: req.file, message:"Successful" });
  });

router.get('/getactive/:pageNo',VIEW.viewall)

router.delete('/deleteall',VIEW.deleteall)

router.get('/getactivity',VIEW.viewactivity)

router.get('/viewgradestudent/:_id',VIEWGRADE.viewgrade)

router.get('/viewgrade', VIEWGRADE.VIEWGRADE1)

router.get('/viewgradestudent/:fName/:lName',VIEWGRADE.viewgrade2)

router.get('/download',VIEW.downloads3)

module.exports = router;