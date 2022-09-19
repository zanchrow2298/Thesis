const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//const cron = require('node-cron');
const cors = require('cors');



const registration = require('./routes/registration')
const LOGIN = require('./routes/SignIn')
const forgot = require('./routes/forgotpassword')
const profile = require('./routes/profile')


const app = express();
app.use(express.json())
app.use(cors())


mongoose.connect("mongodb://127.0.0.1:27017/aionco")
    .then(() => {
        console.log("Connected");
    })
    .catch(() => {
        console.log("Connection failed");
    });

//cron.schedule('*/10 * * * *', hequery.retrieve);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS");
    next();
});

app.use("/register", registration);
app.use("/sign", LOGIN);
app.use("/forgot", forgot)
app.use("/profile", profile)


module.exports = app;