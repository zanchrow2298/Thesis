const USER = require('../../models/registration')
const ADMIN = require('../../models/Admin')
const USERUPLOAD = require('../../models/userupload')

exports.editgrade = (req,res) =>{
    const {math, science, english, ap} = req.body;
    const user = req.params;

    USER.findOneAndUpdate({user},{$set:{math,science,english,ap}}).
    then(result =>{
        res.status(200).json({result})
    }).catch(err =>{
        console.log(err)
    })

}

exports.grade = async(req,res)=>{
    try {
        const _id = req.params._id;
        const {newprofile,grade,remarks} = req.body
        const FileName = req.params.FileName
        const fName = req.params.fName;
        const lName = req.params.lName

        await USER.findOneAndUpdate({fName,lName}, { $inc: { [newprofile]: grade }})
        const result = await USERUPLOAD.findOneAndUpdate({ FileName }, { remarks, grade }, { new: true })

        console.log(result)
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}