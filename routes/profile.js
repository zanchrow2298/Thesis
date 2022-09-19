const express = require('express')
const CHANGe = require('../controller/changepassword')
const PROFILE = require('../controller/profile')
const router = express.Router()

router.get('/profile',PROFILE.profile)

router.patch('/changepass',CHANGe.changepassword)

module.exports = router;