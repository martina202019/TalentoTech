const mongoose = require('mongoose'); //Importa la librería

//Creando el modelo User
const userSchema = new mongoose.Schema({
    //Key : Value
    userId : {
        type : Number,
        required : true,
        unique : true
    },
    name : {
        type     : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    email    : {
        type : String,
        required : true,
        unique : true,
        validate : {
            validator : function(email){
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            },
            message : props => `${props.value} no es un correo electrónico válido!`
        }
    },
    password : {
        type : String,
        required : true,
    },
    avatar : {
        type : String
    }
});

module.exports = mongoose.model('User', userSchema);