import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleName } from 'src/types/common.types';
import { Role } from 'src/models';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role) private readonly roleRepository: typeof Role,
  ) {}

  getByName(name: RoleName) {
    return this.roleRepository.findOne({ where: { name } });
  }

  getByLevel(level: number) {
    return this.roleRepository.findOne({ where: { level } });
  }

  getById(id: number) {
    return this.roleRepository.findByPk(id);
  }
}
