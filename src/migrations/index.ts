import * as migration_20260920_140810_initial from './20260920_140810_initial';
import * as migration_20260922_074857_important_projects_block from './20260922_074857_important_projects_block';

export const migrations = [
  {
    up: migration_20260920_140810_initial.up,
    down: migration_20260920_140810_initial.down,
    name: '20260920_140810_initial',
  },
  {
    up: migration_20260922_074857_important_projects_block.up,
    down: migration_20260922_074857_important_projects_block.down,
    name: '20260922_074857_important_projects_block'
  },
];
