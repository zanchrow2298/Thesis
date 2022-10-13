const mongoose = require('mongoose')
const express = require('express')
const user = require('../../models/registration')


exports.adduser = async  (req, res) => {
    const data = new user({
        email : req.body.email,
        fName : req.body.fName,
        lName : req.body.lName,
        password : req.body.password,
        pNumber: req.body.pNumber,
        date: req.body.date,
        status: req.body.status
        
        
    })

    try {
        const dataToSave = await data.save();
        console.log("Added Successfully")
        res.status(200).json(dataToSave)
    }
    catch (error) {
        console.log(1)
        res.status(400).json({message: error.message})
    }
}