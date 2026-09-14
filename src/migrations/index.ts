import * as migration_20260507_221443_initial from './20260507_221443_initial';
import * as migration_20260914_161111_cases_schema_update2 from './20260914_161111_cases_schema_update2';

export const migrations = [
  {
    up: migration_20260507_221443_initial.up,
    down: migration_20260507_221443_initial.down,
    name: '20260507_221443_initial',
  },
  {
    up: migration_20260914_161111_cases_schema_update2.up,
    down: migration_20260914_161111_cases_schema_update2.down,
    name: '20260914_161111_cases_schema_update2'
  },
];
