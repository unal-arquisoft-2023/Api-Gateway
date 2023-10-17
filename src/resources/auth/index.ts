export * from './interface';
export * from './implementation';

import {migrate} from './migrate';

if (process.env.AUTH_MIGRATE !== undefined) {
  migrate().then(() => { console.info('Auth migration finished') });
}