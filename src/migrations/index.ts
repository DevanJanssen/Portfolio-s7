import * as migration_20260909_115213_initial from './20260909_115213_initial';
import * as migration_20260916_082833_assignment_kind_and_course_select from './20260916_082833_assignment_kind_and_course_select';
import * as migration_20260919_120000_payload_390_user_reset_at from './20260919_120000_payload_390_user_reset_at';

export const migrations = [
  {
    up: migration_20260909_115213_initial.up,
    down: migration_20260909_115213_initial.down,
    name: '20260909_115213_initial',
  },
  {
    up: migration_20260916_082833_assignment_kind_and_course_select.up,
    down: migration_20260916_082833_assignment_kind_and_course_select.down,
    name: '20260916_082833_assignment_kind_and_course_select',
  },
  {
    up: migration_20260919_120000_payload_390_user_reset_at.up,
    down: migration_20260919_120000_payload_390_user_reset_at.down,
    name: '20260919_120000_payload_390_user_reset_at',
  },
];
