import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/typeorm/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './infrastructure/typeorm/jwt/jwt.strategy';
import { UserRepositoryImpl } from './infrastructure/typeorm/repositories/user.repository.impl';

@Module({
  // TypeOrmModule.forFeature([])
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, UserRepositoryImpl],
  exports: [UserRepositoryImpl],
})
export class AuthModule {}
