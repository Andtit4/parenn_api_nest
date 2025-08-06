import { InjectRepository } from '@nestjs/typeorm';
import { ICategory } from '../../repository/category.repository';
import { CategoryEntity } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { Category } from '../../domain/category.model';

export class CategoryRepositoryImpl implements ICategory {
  constructor(
    @InjectRepository(CategoryEntity)
    private repo: Repository<CategoryEntity>,
  ) {}
  async save(category: Category): Promise<Category> {
    // throw new Error('Method not implemented.');
    const entity = this.repo.create(category);
    const saved = await this.repo.save(entity);
    return new Category(saved.id, saved.title, saved.description);
  }
  getAll(): Promise<Category[]> {
    // throw new Error('Method not implemented.');
    return this.repo.find();
  }
}
