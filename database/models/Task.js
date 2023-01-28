const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
        trim : true
    },
    description: {
        type : String,
        required : true,
        trim : true,
    },
    dateExpire: {
        type : Date,
        default : Date.now()
    },
    state: {
        type : Boolean,
        default : false,
    },
    createBy: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    priority : {
        type : String,
        enum : ['Baja', 'Media', 'Alta'],
        default : 'Baja'
    },
    project : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Project',
    }
}, {
    timestamps : true
});

module.exports = mongoose.model('Task', taskSchema);