const express = require('express')
const { Timestamp } = require('mongodb')
const router = express.Router()
const mongoose = require('mongoose')
const File = require('../../models/fileupload')

//for file tags 
exports.filter = async (req, res, next) => {
    const current = new Date()

    const data = new File({
        FileName: req.file,
        Bloodtype: req.body.bloodtype,
        TimeStamp: current.toLocaleString(),
        CaptureKit: req.body.capturekit,
        NewProfile: req.body.newprofile,
        Regex:req.body.regex,
        SampleID: req.body.sampleid,
        SpecimenType: req.body.specimentype,
        DataType: req.body.datatype,
        CancerType: req.body.cancertype,
        SequenceType: req.body.sequencetype,
        Site: req.body.site

    })
    data.save()
    console.log(data)
    // res.status(200).json({data})
    next()
}

//get from mongodb
exports.GETMONGO = async (req, res) => {

    let s3pageSize = 5
    var s3pageNo = (parseInt(req.params.s3pageNo) - 1) * parseInt(s3pageSize)
    const count = await File.estimatedDocumentCount()
    File.find({}, function (err, files) {
        if (err) {
            console.log(err)
        }
        res.json([{ files, count }])
    }).skip(s3pageNo).limit(s3pageSize).sort({ $natural:-1});
};


exports.searchfilter = async(req,res)=>{
    let s3pageSize = 5
    var PageNo = (parseInt(req.params.s3pageNo) - 1) * parseInt(s3pageSize)

     const {FileName, Bloodtype, TimeStamp, CaptureKit, NewProfile, Regex,
         SampleID, SpecimenType, DataType, CancerType, SequenceType, Site} = req.body

     const data = {TimeStamp,CaptureKit, NewProfile, Regex, SampleID, SpecimenType, DataType, CancerType, SequenceType, Site }
        
     console.log(data)
            
         }