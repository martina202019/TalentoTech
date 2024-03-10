const mongoose = require('mongoose');
// const userSchema = require('./User');
// const messageSchema = require('./Message');

const chatSchema = new mongoose.Schema({
    from : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    to : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    messages : {
        type : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'message',
        }],
        required : true,
    }
}, {
    timestamps : true
});

module.exports = mongoose.model('chat', chatSchema )