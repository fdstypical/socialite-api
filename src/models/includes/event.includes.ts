import { Includeable } from 'sequelize';
import { StaticField, User, Interest } from '..';

export const previewInclude: Includeable = {
  model: StaticField,
  as: 'preview',
};

export const creatorInclude: Includeable = {
  model: User,
  as: 'creator',
};

export const interestsInclude: Includeable = {
  model: Interest,
  as: 'interests',
};
