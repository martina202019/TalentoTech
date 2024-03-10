import { IsEmail, IsNotEmpty, IsString, Matches, Validate } from "class-validator";
import { UniqueEmailValidator } from "../validations/unique-email.validator";

export class CreateUserDTO {
  @IsNotEmpty({
    message : "El campo userId es requerido"
  })
  readonly userId : string;
  @IsString({
    message : "El nombre no debe ser un número"
  })
  readonly name: string;
  readonly lastname: string;
  // @IsNotEmpty({
  //   message : "El correo debe ser ingresado"
  // })
  @IsEmail ({}, {message : "El correo ingresado no es correcto"})
  @Validate(UniqueEmailValidator, { message: 'El correo ya fue registrado' })
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8}$/, {
    message : "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial"
  })
  readonly password: string;
}
