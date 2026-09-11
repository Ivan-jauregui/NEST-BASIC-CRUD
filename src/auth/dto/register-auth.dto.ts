import { IsString, IsNumber, IsNotEmpty, MinLength, IsEmail } from 'class-validator';


export class RegisterAuthDto {
    @IsNumber()
    dni: number;

    @IsString()
    @IsNotEmpty({ message: ' El campo nombre es requerido ' })
    firstName: String;

    @IsString()
    @IsNotEmpty({ message: ' El campo apellido es requerido ' })
    lastName: String;

    @IsString()
    @IsEmail({}, { message: 'El correo electrónico no es válido' })
    @IsNotEmpty({ message: ' El campo email es requerido ' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;
}
