const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { connectToMongoDB } = require('./connect')
const studentRoute = require('./routes/student')
const userRoute = require('./routes/user')

const app = express();
// app.use(express.json());
require("dotenv").config();
app.use(cookieParser());
app.set("view engine", "ejs" )
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


  

connectToMongoDB('mongodb://localhost:27017/crud')
  .then(() => console.log('mogoDB connected'));
    
// student routes
app.use("/createStudent", studentRoute);
app.use("/readStudent", studentRoute);
app.use("/updateStudent", studentRoute);
app.use("/deleteStudent", studentRoute);

// user routes
app.use("/createUser", userRoute);
app.use("/loginUser", userRoute);


app.listen(4001, () => {
    console.log('server is running on port 4001');
})