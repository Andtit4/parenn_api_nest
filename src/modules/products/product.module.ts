import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './infrastructure/entities/product.entity';
import { ProductController } from './product.controller';
import { ProductRepositoryImpl } from './infrastructure/repository/product.repository.impl';
// import { JwtStrategy } from '../auth/infrastructure/typeorm/jwt/jwt.strategy';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [JwtService, ProductRepositoryImpl],
  exports: [ProductRepositoryImpl],
})
export class ProductModule {}
