const mongoose = require("mongoose");

const colorValidator = (v) => (/^#([0-9a-f]{3}){1,2}$/i).test(v)

const budget = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    budget:{
        type:Number,
        required:true,
        trim:true
    },
    color:{
        type:String,
        unique: true,
        required:true,
        minlength: 6,
        validator: [colorValidator, 'Invalid color'],
        trim:true
    }
},{collection:"personalBudget"})

module.exports = mongoose.model('personalBudget', budget);