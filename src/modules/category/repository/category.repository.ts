import { Category } from '../domain/category.model';

export interface ICategory {
  save(category: Category): Promise<Category>;
  getAll(): Promise<Category[]>;
}
