const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    user:{
        type: Schema.ObjectId,
        ref: 'User'
    },
    title:{
        type : String,
        required: true
    },
    date:{
        type : Date,
        required: true,
        default : Date.now()
    },
    priority:{
        type : String,
        required: true
    },
    description:{
        type : String,
        required: true
    },
    isCompleted:{
        type : Boolean
    }
});

module.exports = mongoose.model('Task', TaskSchema);