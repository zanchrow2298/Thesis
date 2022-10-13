const express = require('express')
const router = express.Router()
const NEWUSER = require('../../controller/admin/adduser')
const GETALL = require('../../controller/admin/getalladmin')
const EDITUSER = require('../../controller/admin/edituser')


router.post('/newuser', NEWUSER.adduser);

router.get('/getall',GETALL.getall)

router.patch('/edituser/:_id',EDITUSER.edituser)

router.get('/search/:fName',GETALL.search)



module.exports = router;