import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryRepositoryImpl } from './infrastrusture/repository/category.repository.impl';
import { JwtService } from '@nestjs/jwt';

@Controller('category')
export class CategoryController {
  constructor(
    private useRepo: CategoryRepositoryImpl,
    private jwtService: JwtService,
  ) {}

  @Post('create')
  async create(@Body() body) {
    return await this.useRepo.save(body);
  }

  @Get('')
  async getAll() {
    return await this.useRepo.getAll();
  }
}
