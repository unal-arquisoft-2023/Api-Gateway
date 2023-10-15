import Koa from 'koa';
import KoaRouter from 'koa-router';
import koaLogger from 'koa-logger';
import koaBody from 'koa-bodyparser';
import koaCors from '@koa/cors';

import { graphiqlKoa, graphqlKoa } from 'apollo-server-koa';
import { generalSchema, authSchema } from './graphQLSchema';


import { formatErr, generalRequestHeaders } from './utilities';
import { queueGet, queuePost } from './queue/rabbitmq';

import { URL as authURL } from './auth/resolverAuth';

const app = new Koa();
const router = new KoaRouter();
const PORT = process.env.PORT || 5000;

app.use(koaBody());
app.use(koaLogger());
app.use(koaCors());

// read token from header
app.use(async (ctx, next) => {
	if (ctx.header.authorization) {
		const token = ctx.header.authorization.match(/Bearer ([A-Za-z0-9.]+)/);
		if (token && token[1]) {
			ctx.state.authorization = ctx.header.authorization;
		}
	}
	await next();
});

const vaidateAuth = async (ctx,next) => {
  console.log('validating auth')
  console.log(ctx.state.authorization)

  if (ctx.state.authorization) {
    const res = await generalRequestHeaders(`${authURL}/status`, 'GET', { authorization: ctx.state.authorization });
    console.log(res);
    // If the request is successfull the user is authenticated
    // else throw an error 
    if (res.statusCode !== 401) {
      await next();
      return;
    }

  }
  ctx.throw(401, "Unauthorized");

}



console.log('111111111111111111111');
// GraphQL genera
const graphql = graphqlKoa((ctx) => ({
	schema: generalSchema,
	context: { token: ctx.state.token },
	formatError: formatErr
}));
router.use('/graphql', vaidateAuth);
router.post('/graphql', koaBody(), graphql);
router.get('/graphql', graphql);

console.log('222222222222222222222');

const graphqlAuth = graphqlKoa((ctx) => ({
  schema: authSchema,
  context: { token: ctx.state.token },
  formatError: formatErr
}));
router.post('/graphqlAuth', koaBody(), graphqlAuth);


// test route
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

router.post('/queue', koaBody(),queuePost);
router.get('/queue', queueGet);

app.use(router.routes());
app.use(router.allowedMethods());
// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
