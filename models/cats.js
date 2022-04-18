const mongoose = require('mongoose')

const CatSchema = new mongoose.Schema({
    catid: {
        type:String,
        unique:true,
    },
    catname: String,
})

module.exports = mongoose.model("cats", CatSchema)