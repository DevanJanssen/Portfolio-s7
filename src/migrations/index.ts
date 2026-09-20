import * as migration_20260919_165036_initial from './20260919_165036_initial';

export const migrations = [
  {
    up: migration_20260919_165036_initial.up,
    down: migration_20260919_165036_initial.down,
    name: '20260919_165036_initial'
  },
];
