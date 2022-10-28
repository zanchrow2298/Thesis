const express = require('express')
const router = express.Router()
const NEWUSER = require('../../controller/admin/adduser')
const SEARCH = require('../../controller/admin/search')
const EDITUSER = require('../../controller/admin/edituser')
const ADMIN = require('../../controller/admin/admin')
const FILTER = require('../../controller/admin/filter')

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







module.exports = router;