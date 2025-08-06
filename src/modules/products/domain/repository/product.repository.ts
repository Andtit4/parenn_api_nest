import { Product } from '../model/product.model';

export interface IProductRepository {
  save(product: Product): Promise<Product>;
  getAll(): Promise<Product[]>;
  getProductByCategory(categorie: string): Promise<Product | null>;
  getProductById(id: number): Promise<Product | null>;
}
