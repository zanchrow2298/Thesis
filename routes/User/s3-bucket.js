const express = require('express');
const upload = require('../../middleware/s3-bucket');
const router = express.Router();

router.post('/v1/upload', upload.array('image', 1), (req, res) => {
    res.send({ image: req.file, message:"Successful" });
  });


module.exports = router;