const express = require('express')
const router = express.Router();
const LOGIN = require('../../controller/User/signin')


router.post('/login',LOGIN.login)

router.get('/test', ()=>{
    console.log(":::::::::::::::::",LOGIN.token)
})
module.exports = router;
