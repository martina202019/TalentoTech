import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDTO{
    @IsNotEmpty( {message : "El campo de correo no debe estar vacio"} )
    @IsEmail ({}, {message : "El correo ingresado no es correcto"})
    readonly email : string;
    @IsString()
    @IsNotEmpty({message : "El campo de contraseña no debe estar vacio"})
    readonly password : string;
}