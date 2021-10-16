import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserMongoRepository } from './users.mongo.repository';
@Injectable()
export class UsersService {
  // constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  constructor(private readonly userRepository: UserMongoRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findByEmail(loginUserDto.email);
    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    if (user.password !== loginUserDto.password) {
      throw new HttpException('Login inválido', HttpStatus.BAD_REQUEST);
    } else return user;
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.remove(id);
  }
}
