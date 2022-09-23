import { Includeable } from 'sequelize';
import { Interest, LifePhoto, Role, StaticField, UserAvatar } from '..';

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

export const lifePhotosInclude: Includeable = {
  model: LifePhoto,
  as: 'lifePhotos',
  include: [StaticField],
};
