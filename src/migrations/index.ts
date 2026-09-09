import * as migration_20260909_115213_initial from './20260909_115213_initial';

export const migrations = [
  {
    up: migration_20260909_115213_initial.up,
    down: migration_20260909_115213_initial.down,
    name: '20260909_115213_initial'
  },
];
