const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv/config');
const showSchedule = require('./Routes/showSchedule');
const authRoute = require('./Routes/auth');


// Booting the server up

const app = express();
app.use(cors());
app.use(express.json());




// DB connection

mongoose.connect(process.env.DB_CONNECTION,()=>{
    console.log("Database connected");
});

// const collections = mongoose.connection.collections;
// var names = [];
// Object.keys(collections).forEach(function(k) {
//     names.push(k);
// })
// console.log(names);
// Routes


app.get("/",(req,res)=>{
    res.send("Hello JI");
})

app.use("/showSchedule",showSchedule);
app.use("/auth",authRoute);

app.listen(8000,()=>{
    console.log("Server running in port 8000");
});

