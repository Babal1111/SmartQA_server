const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name :{type: String,required:true},
    email :{type: String,required: true, unique:true},
    password :{type: String,required: true}, // true if not added google oAuth
    role:{type:String,default: "admin"}
    
});

module.exports = mongoose.model("Users",userSchema);