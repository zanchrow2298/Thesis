const express = require ("express");
const multer = require ("multer");

//in progress avatar change feature
const storage = multer.diskStorage({
    destination: (req, file, cb) =>  {
        cb(null, "data/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

router.post('', multer({storage: storage}).single("file"), (req, res, next) => {
    seal.generateKey(req.file.filename)
       .then(output => {
           const file = new File({
                uid: req.file.filename.split('-')[0],
                name: req.file.originalname,
                path: req.file.filename ,
               
             });
           file.save()
            .then(()=>{
                res.status(200).json({
                    result: "Saved"
                 })
            })
           
      })
      .catch(err => {
        res.status(500).json({
            result: "failure",
            message: "Something went wrong"
        })});
});