import * as migration_20260909_115213_initial from './20260909_115213_initial';
import * as migration_20260916_082833_assignment_kind_and_course_select from './20260916_082833_assignment_kind_and_course_select';

export const migrations = [
  {
    up: migration_20260909_115213_initial.up,
    down: migration_20260909_115213_initial.down,
    name: '20260909_115213_initial',
  },
  {
    up: migration_20260916_082833_assignment_kind_and_course_select.up,
    down: migration_20260916_082833_assignment_kind_and_course_select.down,
    name: '20260916_082833_assignment_kind_and_course_select'
  },
];
