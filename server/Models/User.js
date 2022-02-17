const mongoose = require('mongoose');

const mondaySchema = new mongoose.Schema({
    user_name : {
        type : String,
        required : true
    },
    user_sec : {
        type : String,
        required : true
    },
    user_email : {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required'
    },
    user_pass : {
        type : String,
        min : 6,
        required : true
    },
    Date : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Users',mondaySchema);