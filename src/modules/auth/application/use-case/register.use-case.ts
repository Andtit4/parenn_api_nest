import { User } from '../../domain/model/user.model';
import { IUserRepository } from '../../domain/repository/user.repository';
import * as bcrypt from 'bcrypt';

export class RegisterUseCase {
  constructor(private readonly useRepo: IUserRepository) {}

  async execute(
    email: string,
    username: string,
    password: string,
    type_utilisateur: string,
  ): Promise<User> {
    const hashed = await bcrypt.hash(password, 10);
    const user = new User(0, email, username, hashed, type_utilisateur);
    return this.useRepo.save(user);
  }
}
