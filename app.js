const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//const cron = require('node-cron');
const cors = require('cors');



const registration = require('./routes/User/registration')
const LOGIN = require('./routes/User/signin')
const forgot = require('./routes/User/forgotpassword')
const profile = require('./routes/User/profile')
const createOpaMiddleware = require('./middleware/opa')
const upload = require('./routes/User/s3-bucket')
const newuser = require('./routes/adminroutes/admin')


const app = express();
app.use(express.json())
app.use(cors())
const hasPermission = createOpaMiddleware("http://localhost:8181")

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
app.get('/orders/:id', hasPermission('read', 'order'), (req, res) => {
    res.json({ message: `you can read order with id ${req.params.id}` })
})
app.post('/orders', hasPermission('create', 'order'), (req, res) => {
    res.json({ message: `you can create order` })
})


app.use("/register", registration);
app.use("/sign", LOGIN);
app.use("/forgot", forgot)
app.use("/profile", profile)
app.use("/api",upload)
app.use("/admin",newuser)
// app.use("/exp")



module.exports = app;