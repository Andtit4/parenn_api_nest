import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from 'src/modules/auth/domain/repository/user.repository';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { User } from 'src/modules/auth/domain/model/user.model';

export class UserRepositoryImpl implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private repo: Repository<UserEntity>,
  ) {}
  findByEmail(email: string): Promise<User | null> {
    // throw new Error('Method not implemented.');
    return this.repo.findOne({ where: { email } });
  }
  async save(user: User): Promise<User> {
    // throw new Error('Method not implemented.');
    const entity = this.repo.create(user);
    const saved = await this.repo.save(entity);
    return new User(
      saved.id,
      saved.email,
      saved.username,
      saved.password,
      saved.type_utilisateur,
    );
  }
}
