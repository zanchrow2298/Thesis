const express = require('express')
const router = express.Router()
const REGISTRATION = require('../controller/registration')


router.post('/email',REGISTRATION.email)

router.patch('/password/:_id',REGISTRATION.password)

router.patch('/profile/:_id',REGISTRATION.profile)


module.exports = router;