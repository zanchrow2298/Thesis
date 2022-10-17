const express = require('express')
const User = require('../../models/registration')
const bcrypt = require('bcrypt')
const Admin = require('../../models/Admin')



exports.edituser = async (req, res) => {
    const _id = req.params._id
    const email = req.body.email
    const lName = req.body.lName
    const fName = req.body.fName
    let password = req.body.password
    const pNumber = req.body.pNumber
    const date = req.body.date
    const roles = req.body.roles
    const status = req.body.status


    const data = new Admin({_id, 
        email, 
        lName,
        fName, 
        password, 
        pNumber, 
        date, 
        roles,
        status})


    //Edit user on admin page
    if(roles == "User"){
        try {

            await User.findByIdAndUpdate(

                { _id }, {password,roles,$set:{email:email, lName:lName,fName:fName,pNumber:pNumber,date:date,status:status} }, { upsert: true})
                .then(result => {
                    result.save()
                    res.status(200).json({
                        result: "success",
                        message: "User updated successfully"
                    });
                });
        }
        catch (error) {
            console.log(error)
            // res.status(200).json({result:"Failed",message:"Need to relogin"})
        }
    }else{
        try {
            await User.findOne({ email })
            .then(async users=>{
                password = users.password
                console.log(password)
                const dataToSave = await Admin.insertMany({email,lName,fName,pNumber,date,roles,status,password});
                console.log(dataToSave)
                User.findByIdAndDelete(_id, async(err)=>{
                console.log("Added Successfully")
                console.log("Deleted")
                res.status(200).json(dataToSave)
            })
            
            })
            }catch(error) {
            console.log(1)
            res.status(400).json({message: error.message})
            }}}
    

    

    exports.editadmin = async (req, res) => {
        const _id = req.params._id
        const email = req.body.email
        const lName = req.body.lName
        const fName = req.body.fName
        let password = req.body.password
        const pNumber = req.body.pNumber
        const date = req.body.date
        const roles = req.body.roles
        const status = req.body.status
    
    
        const data = new User({_id, 
            email, 
            lName,
            fName, 
            password, 
            pNumber, 
            date, 
            roles,
            status})
    
    
        //Edit user on admin page
        if(roles == "Admin"){
            try {
    
                await Admin.findByIdAndUpdate(
    
                    { _id }, {password,roles,$set:{email:email, lName:lName,fName:fName,pNumber:pNumber,date:date,status:status} }, { upsert: true})
                    .then(results => {
                        results.save()
                        res.status(200).json({
                            result: "success",
                            message: "User updated successfully"
                        });
                    });
            }
            catch (error) {
                console.log(error)
                // res.status(200).json({result:"Failed",message:"Need to relogin"})
            }
        }else{
            try {
                await Admin.findOne({ email })
                .then(async users=>{
                    password = users.password
                    const dataToSave = await User.insertMany({email,lName,fName,pNumber,date,roles,status,password});
                    console.log(dataToSave)
                    Admin.findByIdAndDelete(_id, async(err)=>{
                    console.log("Added Successfully")
                    console.log("Deleted")
                    res.status(200).json(dataToSave)
                })
                
                })
                
            }
            catch (error) {
                console.log(1)
                res.status(400).json({message: error.message})
            }
        }
    
        }
    


