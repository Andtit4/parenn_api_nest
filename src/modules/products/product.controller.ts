import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProductRepositoryImpl } from './infrastructure/repository/product.repository.impl';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/shared/guards/jwt-guard';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductController {
  constructor(
    private useRepo: ProductRepositoryImpl,
    private jwtService: JwtService,
  ) {}

  @Post('create')
  async create(@Body() body) {
    return this.useRepo.save(body);
  }

  @Get(':categorie')
  async getProductByCategory(@Param() categorie: string) {
    return await this.getProductByCategory(categorie);
  }

  @Get(':id')
  async getProductById(@Param() id: number) {
    return await this.getProductById(id);
  }

  @Get()
  async getAll() {
    return this.useRepo.getAll();
  }
}
