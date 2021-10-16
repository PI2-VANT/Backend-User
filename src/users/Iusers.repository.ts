import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface IUserRepository {
  create(createUserDto: CreateUserDto): Promise<User>;
  findAll(): Promise<User[] | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findOne(id: string): Promise<User | undefined>;
  update(id: string, updateUserDto: UpdateUserDto): Promise<User | undefined>;
  remove(id: string): Promise<string>;
}
