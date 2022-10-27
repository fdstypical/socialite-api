import { Includeable } from 'sequelize';
import { Location, User, Interest } from '..';

export const locationInclude: Includeable = {
  model: Location,
  as: 'location',
};

export const creatorInclude: Includeable = {
  model: User,
  as: 'creator',
};

export const interestsInclude: Includeable = {
  model: Interest,
  as: 'interests',
};
