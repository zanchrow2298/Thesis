const express = require('express')
const FORGOT = require('../controller/forgotpassword')
const router = express.Router();


router.post('/mail', FORGOT.mail);

router.post('/confirmcode', FORGOT.confirmcode)

router.patch('/updatepassword', FORGOT.updatepassword)


module.exports = router;