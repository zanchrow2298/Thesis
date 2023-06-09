const express = require('express')
const router = express.Router()
const NEWUSER = require('../../controller/admin/adduser')
const SEARCH = require('../../controller/admin/search')
const EDITUSER = require('../../controller/admin/edituser')
const ADMIN = require('../../controller/admin/admin')
const FILTER = require('../../controller/admin/filter')
const ANNOUCEMENT = require('../../controller/admin/announcement')
const upload = require('../../middleware/s3-bucket');
const EDITGRADE = require('../../controller/admin/editgrade')

router.post('/loginadmin',ADMIN.login)

router.post('/newuser', NEWUSER.adduser);

router.get('/getall',SEARCH.getall)

router.patch('/edituser/:_id',EDITUSER.edituser)

router.patch('/editadmin/:_id',EDITUSER.editadmin)

router.get('/search/:fName',SEARCH.search)

router.get('/getuser/:_id',SEARCH.getbyID)

router.get('/page/:pageNo/:pageSize', SEARCH.page)

router.get('/pageadmin/:adminpageNo/:adminpageSize', SEARCH.pageadmin)

router.get('/search/:search/:pageno/:total',SEARCH.page1)

router.post('/register',ADMIN.adduser)

router.post('/searchfilter/:PageNo',FILTER.searchfilter)

router.get('/filesearch/:FileName', SEARCH.filesearch)

router.get('/getmongo/:pageNo',FILTER.GETMONGO)

router.get('/getsubject/:newprofile/:fName/:lName/:filename',FILTER.getbySubj);

router.post('/announcement', upload.array('file',1),ANNOUCEMENT.annoucement, (req, res) => {
    console.log(1)
  
      res.send({ file: req.file, message:"Successful" });
    });
  
router.patch('/updateannouncement/:_id',ANNOUCEMENT.editannoucement);

router.get('/announcement/:pageNo',ANNOUCEMENT.viewall)

router.patch('/throwgrade/:fName/:lName/:FileName',EDITGRADE.grade)

router.get('/getsubjectstudent/:newprofile/:FileName',FILTER.getbySubjstudent);

router.get('/getsubjectstudent/:newprofile',FILTER.getbySubjstudentacctivity);

module.exports = router;