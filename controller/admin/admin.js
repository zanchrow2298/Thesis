const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router();
const jwt = require('jsonwebtoken');
const ADMIN = require('../../models/Admin');


//JWT LOGIN
exports.login = async (req, res) => {

    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await ADMIN.findOne({ email });

        if (user.status == "Active") {

            if (user && (await bcrypt.compare(password, user.password))) {
                // Create token
                const token = jwt.sign(
                    { user_id: user._id, email },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    }
                );
                // save user token
                user.token = token;
                // user
                res.status(200).json({ token, user });
                console.log(user)
            } else {
                token = null;
                res.status(200).json({ message: "Invalid Credentials", token })
            }
        } else {
            res.status(200).json({ result: "Failure", message: "Inactive User]=" })
        }
    } catch (err) {
        console.log(err);
    }

}


exports.adduser = async (req, res) => {
    const data = new user({
        email: req.body.email,
        fName: req.body.fName,
        lName: req.body.lName,
        password: req.body.password,
        pNumber: req.body.pNumber,
        date: req.body.date,
        roles: req.body.roles,
        status: req.body.status


    })

    try {
        const dataToSave = await data.save();
        console.log("Added Successfully")
        res.status(200).json(dataToSave)
    }
    catch (error) {
        console.log(1)
        res.status(400).json({ message: error.message })
    }
}

