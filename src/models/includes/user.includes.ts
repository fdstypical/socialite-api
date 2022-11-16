import { Includeable } from 'sequelize';
import { Interest, UserPhoto, Role, StaticField, UserAvatar } from '..';

export const roleInclude: Includeable = { model: Role, as: 'role' };

export const createdInterestsInclude: Includeable = {
  model: Interest,
  as: 'createdInterests',
};

export const interestsInclude: Includeable = {
  model: Interest,
  as: 'interests',
};

export const avatarInclude: Includeable = {
  model: UserAvatar,
  as: 'avatar',
  include: [StaticField],
};

export const userPhotosInclude: Includeable = {
  model: UserPhoto,
  as: 'photos',
  include: [StaticField],
};
