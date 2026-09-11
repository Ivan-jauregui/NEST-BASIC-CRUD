import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity.js';
import { RegisterAuthDto } from './dto/register-auth.dto.js';
import { LoginAuthDto } from './dto/login-auth.dto.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterAuthDto): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({ email: registerDto.email });
    if (existingUser) throw new BadRequestException('El email ya está registrado');

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = this.userRepository.create({ ...registerDto, password: hashedPassword });
    return await this.userRepository.save(user);
  }

  async login(loginDto: LoginAuthDto) {
    const user = await this.userRepository.findOneBy({ email: loginDto.email });
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Credenciales inválidas');

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}