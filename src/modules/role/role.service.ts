import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleName } from 'src/types/common.types';
import { Role } from 'src/models';
import { CreateRoleAttributes } from 'src/models/Role/interfaces';
import { BadRequestException } from 'src/core/exceptions/build-in/bad-request.exception';
import { ErrorMessage } from 'src/core/constants/error.messages';
import { Nullable } from 'src/core/types/app.types';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role) private readonly roleRepository: typeof Role,
  ) {}

  getByName(name: RoleName, rejectOnEmpty: Nullable<Error> = null) {
    return this.roleRepository.findOne({
      where: { name },
      rejectOnEmpty:
        rejectOnEmpty ??
        new BadRequestException(ErrorMessage.BadRequest, 'No such role'),
    });
  }

  getById(id: number, rejectOnEmpty: Nullable<Error> = null) {
    return this.roleRepository.findByPk(id, {
      rejectOnEmpty:
        rejectOnEmpty ??
        new BadRequestException(ErrorMessage.BadRequest, 'No such role'),
    });
  }

  findOrCreate(dto: CreateRoleAttributes) {
    return this.roleRepository.findOrCreate({
      where: { name: dto.name },
      defaults: dto,
    });
  }
}
