import * as migration_20260920_140810_initial from './20260920_140810_initial';

export const migrations = [
  {
    up: migration_20260920_140810_initial.up,
    down: migration_20260920_140810_initial.down,
    name: '20260920_140810_initial'
  },
];
