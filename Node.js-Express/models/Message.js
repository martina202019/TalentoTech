const mongoose = require('mongoose');
//const userSchema = require('./User')

const messageSchema = new mongoose.Schema({
    body : {
        type : String,
        required : true,
    },
    from : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    to : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    readed : {
        type : Boolean,
        default : false,
        required : true,
    }
},{
    timestamps : true,
})

module.exports = mongoose.model('message', messageSchema);