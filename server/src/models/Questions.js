const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    roomCode: {type:String, required: true},
    content: {type:String, required: true},
    // this should be userId from the user Schems for future reference
    user: {type:String},
    createdAt:{type:Date, default: Date.now}
});

module.exports = mongoose.model("Questions",questionSchema);