import './resources/config';
import * as Koa from 'koa';
import * as Router from '@koa/router';
import * as logger from 'koa-logger';
import * as bodyParser from 'koa-bodyparser';
import * as gracefulShutdown from 'http-graceful-shutdown';
import { yoga, yogaMiddleware } from './graphql/yoga.js';
import { NotificationsRepositoryImpl } from './resources/notification';
import {connectToRabbitMQ, publishMessage, consumeMessage, queueGet, queuePost} from './resources/queue';
const app = new Koa();
const router = new Router();

app
  .use(logger())
//   .use(bodyParser()) dont use on the main app, graphql request bodies are lost

router.all(yoga.graphqlEndpoint, async (ctx, next) => {
  await next();
}
)

router.use(yoga.graphqlEndpoint, async (ctx) => {
  await yogaMiddleware(ctx)
});

router.use('/test', bodyParser())
router.get('/test', async (ctx, next) => {

  const a = await connectToRabbitMQ();
  //await publishMessage(a.channel,'notification_queue', {contact:'+573045402014', message:'test'});
  //await consumeMessage(a.channel,'notification_queue');
  //const awa = await NotificationsRepositoryImpl.delete(3);
  //await queuePost(ctx);
  await queueGet(ctx);
  const awa ="sx";
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = {
    awa
  }


  await next();
});



app
  .use(router.routes())
  .use(router.allowedMethods());

const server = app.listen(5555, () => {
  console.info('Api-Gateway listening on port 5555');
  console.info(`graphql endpoint: ${yoga.graphqlEndpoint}`);
});



const shutdown: gracefulShutdown.Options['onShutdown'] = (signal) => {
  return new Promise<void>((resolve) => {
    console.info(`\nApi-Gateway received ${signal}. starting cleanup...`);
    // Close connections here

    console.info('Api-Gateway cleanup finished');
    resolve();
  });
}

const finalShutdown: gracefulShutdown.Options['finally'] = () => {
  console.info('Api-Gateway shutdown finished');
}

gracefulShutdown(server, {
  signals: 'SIGINT SIGTERM',
  timeout: 2000,
  development: false,
  onShutdown: shutdown,
  finally: finalShutdown
});