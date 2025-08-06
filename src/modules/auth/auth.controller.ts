import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserRepositoryImpl } from './infrastructure/typeorm/repositories/user.repository.impl';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterUseCase } from './application/use-case/register.use-case';
import { JwtAuthGuard } from 'src/shared/guards/jwt-guard';

@Controller('auth')
export class AuthController {
  constructor(
    private userRepo: UserRepositoryImpl,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() body) {
    const user = await this.userRepo.findByEmail(body.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // const password_hashed = await bcrypt.hashed(body.password, 10)

    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = {
      email: user.email,
      sub: user.id,
      username: user.username,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  @Post('register')
  async register(@Body() body) {
    const emailAlreadyUsed = await this.userRepo.findByEmail(body.email);
    if (emailAlreadyUsed) throw new UnauthorizedException('Email already used');
    const useCase = new RegisterUseCase(this.userRepo);
    return useCase.execute(body.email, body.username, body.password, 'CLIENT');
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Request() req) {
    return req.user;
  }
}
