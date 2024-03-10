import * as mongoose from 'mongoose';

//Creando el modelo User
export const userSchema = new mongoose.Schema({
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
        validate : {
            validator : function(password){
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8}$/.test(password);
            },
            message : props => "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial"
        }
    },
    avatar : {
        type : String
    }
});
