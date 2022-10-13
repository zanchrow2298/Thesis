const express = require('express')
const CHANGe = require('../../controller/User/changepassword')
const PROFILE = require('../../controller/User/profile')
const router = express.Router()

router.post('/profile',PROFILE.profile)

router.patch('/changepass',CHANGe.changepassword)

router.patch('/updateprofile',PROFILE.editprofile)

module.exports = router;