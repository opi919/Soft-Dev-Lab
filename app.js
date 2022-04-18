const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

app.get('/api',(req,res)=>{
    res.send("API homepage")
})

app.use('/api/cats',require('./routes/cats'))

mongoose.connect(process.env.DB_CONNECTION,()=>{
    console.log("database connected")
})
app.listen(3000,()=>{
    console.log("server started");
})