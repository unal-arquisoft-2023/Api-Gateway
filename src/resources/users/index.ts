export * from './interface';
export * from './implementation';
import {migrate} from './migrate'

if (process.env.USERS_MIGRATE !== undefined) {
  migrate().then(() => { console.info('Users migration finished') });
}