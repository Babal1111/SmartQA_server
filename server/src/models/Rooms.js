const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomCode: {type: String,required: true,unique:true},
    createdBy:{type: String,},// this should reference to the user ubjectId
    isActive:{type:Boolean, default: true},// like after 30 days of subscription change the is ACtivestaus
    createdAt:{type:Date,default: Date.now}
});

module.exports = mongoose.model("Rooms",roomSchema)