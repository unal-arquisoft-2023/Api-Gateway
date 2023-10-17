export * from './interface';
export * from './implementation';
import {migrate} from './migrate'

if (process.env.REGMED_API !== undefined) {
  migrate().then(() => { console.info('Users migration finished') });
}