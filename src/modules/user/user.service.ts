import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models';
import { CreateUserDto } from './dto/create.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async create(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getAll() {
    const users = await this.userRepository.findAll();
    return users;
  }
}
