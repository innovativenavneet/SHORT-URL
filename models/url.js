const mongoose = require("mongoose");

// creating a schema inside model then we will use a model to use this schema 

// that schema will tell us only this type of request will get accepted 

// SO WE ARE DESIGNIG A DB HERE 
const urlSchema = new mongoose.Schema({
shortId: {
    type : String,
    required : true,
    unique: true,
},
redirectURL: {
    type : String,
    required: true,
},
visitHistory: [{timestamp : {type : Number}}],
},
{timestamps : true});

// model 

const URL = mongoose.model("url",urlSchema);

module.exports= URL;