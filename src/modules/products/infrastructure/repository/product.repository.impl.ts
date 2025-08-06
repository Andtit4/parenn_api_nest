import { InjectRepository } from '@nestjs/typeorm';
import { IProductRepository } from '../../domain/repository/product.repository';
import { ProductEntity } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { Product } from '../../domain/model/product.model';

export class ProductRepositoryImpl implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private repo: Repository<ProductEntity>,
  ) {}
  getProductByCategory(categorie: string): Promise<Product> {
    // throw new Error('Method not implemented.');
    return this.repo.findOne({ where: { categorie } });
  }
  async save(product: Product): Promise<Product> {
    // throw new Error('Method not implemented.');
    const entity = this.repo.create(product);
    const saved = await this.repo.save(entity);
    return new Product(
      saved.id,
      saved.name,
      saved.description,
      saved.price,
      saved.image,
      saved.categorie,
    );
  }
  getAll(): Promise<Product[]> {
    // throw new Error('Method not implemented.');
    return this.repo.find();
  }
  /* getProductByCategory(categorie: string): Promise<Product[]> {
    // throw new Error('Method not implemented.');
    return this.repo.findOne({ where: { categorie } });
  } */
  getProductById(id: number): Promise<Product | null> {
    // throw new Error('Method not implemented.');
    return this.repo.findOne({ where: { id } });
  }
}
