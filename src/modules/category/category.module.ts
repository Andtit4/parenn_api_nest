import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './infrastrusture/entities/category.entity';
import { JwtService } from '@nestjs/jwt';
import { CategoryRepositoryImpl } from './infrastrusture/repository/category.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryController],
  providers: [JwtService, CategoryRepositoryImpl],
  exports: [CategoryRepositoryImpl],
})
export class CategoryModule {}
