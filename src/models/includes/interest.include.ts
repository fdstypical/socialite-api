import { Includeable } from 'sequelize';
import { StaticField, User } from '..';

export const previewInclude: Includeable = {
  model: StaticField,
  as: 'preview',
};

export const creatorInclude: Includeable = {
  model: User,
  as: 'creator',
};

export const usersInclude: Includeable = {
  model: User,
  as: 'users',
};
