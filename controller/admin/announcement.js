const ANNOUCEMENT = require('../../models/announcement')

exports.annoucement = async (req, res, next) => {
    const current = new Date();
    var day = current.getDate();
    var month = current.getMonth();
    var year = current.getFullYear();
    var stamp = day + "/" + month + "/" + year;
    console.log(stamp);
    const data = new ANNOUCEMENT({
      FileName: req.file,
      // TimeStamp: ,
      start_date: req.body.start_date,
      announcementtitle: req.body.announcementtitle,
      end_date: req.body.end_date,
      Detail: req.body.detail,
      status:req.body.status
    });
    console.log(data)
  
    if (
      data.Detail
     
     ) {
      data.save();
      res.status(200).json(data);
      console.log(data);
    } else {
      console.log("asdasd")
      res.status(200).json({ message: "Please fill out the form" });
  
    }
  };

  exports.editannoucement = async(req,res)=>{
    const _id = req.params._id
    const {Detail, start_date,end_date, announcementtitle,status} = req.body
    console.log(_id)

    ANNOUCEMENT.findByIdAndUpdate({_id},{$set:{Detail:Detail, start_date:start_date, end_date:end_date,announcementtitle:announcementtitle,status:status},new:true}). 
    then(result=>{
        res.status(200).json({result})
    })
    }
  

    exports.viewall = async(req,res)=>{
      let pageSize = 5;
      var pageNo = (parseInt(req.params.pageNo) - 1) * parseInt(pageSize);
      const count = await ANNOUCEMENT.estimatedDocumentCount();
      ANNOUCEMENT.find({})
      .sort({"TimeStamp": -1})
      .skip(pageNo)
      .limit(pageSize)
      .then(result=>{
        res.status(200).json({result,count})
      })
    }