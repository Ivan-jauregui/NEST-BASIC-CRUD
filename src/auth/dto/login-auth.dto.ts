import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginAuthDto {

    @IsString()
    @IsEmail({}, { message: 'El correo electrónico no es válido' })
    @IsNotEmpty({ message: ' El campo email es requerido ' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'La contraseña es requerida para iniciar sesión' })
    password: string;
}
