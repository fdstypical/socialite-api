import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleName } from 'src/types/common.types';
import { Role } from 'src/models';
import { CreateRoleDto } from './dto/create.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role) private readonly roleRepository: typeof Role,
  ) {}

  getByName(name: RoleName) {
    return this.roleRepository.findOne({ where: { name } });
  }

  getById(id: number) {
    return this.roleRepository.findByPk(id);
  }

  findOrCreate(dto: CreateRoleDto) {
    return this.roleRepository.findOrCreate({
      where: { name: dto.name },
      defaults: dto,
    });
  }
}
