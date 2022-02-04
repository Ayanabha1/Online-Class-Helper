const mongoose = require('mongoose');

const mondaySchema = new mongoose.Schema({
    class_day : {
        type : String,
        required : true
    },
    class_sec : {
        type : String,
        required : true
    },
    class_name : {
        type : String,
        required : true
    },
    class_teacher : {
        type : String ,
        required : true
    },
    class_time : {
        type : String ,
        required : true,
    },
    class_link : {
        type : String,
        required : true
    },
    classroom : {
        type : String
    },
    class_resources : {
        type : String
    }
});

module.exports = mongoose.model('schedules',mondaySchema);