import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginAuthDto } from './dto/login-auth.dto.js';
import { RegisterAuthDto } from './dto/register-auth.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() register: RegisterAuthDto) {
    return this.authService.register(register);
  }
  @Post('/login')
  login(@Body() login: LoginAuthDto) {
    return this.authService.login(login);
  }

}
