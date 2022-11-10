const express = require("express");
const { Timestamp } = require("mongodb");
const router = express.Router();
const mongoose = require("mongoose");
const File = require("../../models/fileupload");
const moment = require("moment");
const { ISO_8601 } = require("moment");

//for file tags
exports.filter = async (req, res, next) => {
  const current = new Date();
  var day = current.getDate();
  var month = current.getMonth();
  var year = current.getFullYear();
  var stamp = day + "/" + month + "/" + year;
  console.log(stamp);
  const data = new File({
    FileName: req.file,
    // TimeStamp: ,
    CaptureKit: req.body.capturekit,
    NewProfile: req.body.newprofile,
    Regex: req.body.regex,
    SampleID: req.body.sampleid,
    SpecimenType: req.body.specimentype,
    DataType: req.body.datatype,
    CancerType: req.body.cancertype,
    SequenceType: req.body.sequencetype,
    Site: req.body.site,
  });

  if (
    data.CaptureKit &&
    data.NewProfile &&
    data.Regex &&
    data.SampleID &&
    data.SpecimenType &&
    data.DataType &&
    data.CancerType &&
    data.SequenceType &&
    data.Site
  ) {
    data.save();
    res.status(200).json(data);
    console.log(data);
  } else {
    res.status(200).json({ message: "Please fill out the form" });

  }
};

//get from mongodb
exports.GETMONGO = async (req, res) => {
  let s3pageSize = 5;
  var s3pageNo = (parseInt(req.params.s3pageNo) - 1) * parseInt(s3pageSize);
  const count = await File.estimatedDocumentCount();
  File.find({}, function (err, files) {
    if (err) {
      console.log(err);
    }
    res.json([{ files, count }]);
  })
    .skip(s3pageNo)
    .limit(s3pageSize)
    .sort({ $natural: -1 });
};

//search filter
exports.searchfilter = async (req, res) => {
  let pageSize = 5;
  var PageNo = (parseInt(req.params.PageNo) - 1) * pageSize;

  const {
    TimeStampA,
    TimeStampB,
    CaptureKit,
    Regex,
    sampleid,
    SpecimenType,
    DataType,
    CancerType,
    SequenceType,
    Site,
  } = req.body;

  if (TimeStampA && TimeStampB) {
    let year = TimeStampB.split("-")[0];
    let month = TimeStampB.split("-")[1];
    let date = TimeStampB.split("-")[2];
    let adddate = parseInt(date) + 1;
    let fulldate = year + "-" + month + "-" + adddate;
    File.find({
      $and: [
        { SpecimenType: SpecimenType || { $regex: /.+/ } },
        { DataType: DataType || { $regex: /.+/ } },
        { CaptureKit: CaptureKit || { $regex: /.+/ } },
        { Regex: Regex || { $regex: /.+/ } },
        { Site: Site || { $regex: /.+/ } },
        { CancerType: CancerType || { $regex: /.+/ } },
        { SequenceType: SequenceType || { $regex: /.+/ } },
        {
          TimeStamp: { $gte: new Date(TimeStampA), $lte: new Date(fulldate) },
        },
        { SampleID: sampleid || { $regex: /.+/ } },
      ],
    })
      .or({ $and: [{}] })
      .collation({ locale: "en", strength: 2 })
      .skip(PageNo)
      .limit(pageSize)
      .then((data) => {
        res.status(200).json(data);
      });
  } else if (TimeStampA) {
    File.find({
      $and: [
        { SpecimenType: SpecimenType || { $regex: /.+/ } },
        { DataType: DataType || { $regex: /.+/ } },
        { CaptureKit: CaptureKit || { $regex: /.+/ } },
        { Regex: Regex || { $regex: /.+/ } },
        { Site: Site || { $regex: /.+/ } },
        { CancerType: CancerType || { $regex: /.+/ } },
        { SequenceType: SequenceType || { $regex: /.+/ } },
        { TimeStamp: { $gte: new Date(TimeStampA) } },
        { SampleID: sampleid || { $regex: /.+/ } },
      ],
    })
      .or({ $and: [{}] })
      .collation({ locale: "en", strength: 2 })
      .skip(PageNo)
      .limit(pageSize)
      .then((data) => {
        res.status(200).json(data);
      });
  } else if (TimeStampB) {
    let year = TimeStampB.split("-")[0];
    let month = TimeStampB.split("-")[1];
    let date = TimeStampB.split("-")[2];
    let adddate = parseInt(date) + 1;
    let fulldate = year + "-" + month + "-" + adddate;
    File.find({
      $and: [
        { SpecimenType: SpecimenType || { $regex: /.+/ } },
        { DataType: DataType || { $regex: /.+/ } },
        { CaptureKit: CaptureKit || { $regex: /.+/ } },
        { Regex: Regex || { $regex: /.+/ } },
        { Site: Site || { $regex: /.+/ } },
        { CancerType: CancerType || { $regex: /.+/ } },
        { SequenceType: SequenceType || { $regex: /.+/ } },
        { TimeStamp: { $lt: new Date(fulldate) } },
        { SampleID: sampleid || { $regex: /.+/ } },
      ],
    })
      .or({ $and: [{}] })
      .collation({ locale: "en", strength: 2 })
      .skip(PageNo)
      .limit(pageSize)
      .then((data) => {
        res.status(200).json(data);
      });
  } else {
    File.find({
      $and: [
        { SpecimenType: SpecimenType || { $regex: /.+/ } },
        { DataType: DataType || { $regex: /.+/ } },
        { CaptureKit: CaptureKit || { $regex: /.+/ } },
        { Regex: Regex || { $regex: /.+/ } },
        { Site: Site || { $regex: /.+/ } },
        { CancerType: CancerType || { $regex: /.+/ } },
        { SequenceType: SequenceType || { $regex: /.+/ } },
        { SampleID: sampleid || { $regex: /.+/ } },
      ],
    })
      .or({ $and: [{}] })
      .collation({ locale: "en", strength: 2 })
      .skip(PageNo)
      .limit(pageSize)
      .then((data) => {
        res.status(200).json(data);
      });
  }
};
