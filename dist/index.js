"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./resources/config");
const Koa = require("koa");
const Router = require("@koa/router");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const gracefulShutdown = require("http-graceful-shutdown");
const yoga_js_1 = require("./graphql/yoga.js");
const notification_1 = require("./resources/notification");
const app = new Koa();
const router = new Router();
app
    .use(logger());
//   .use(bodyParser()) dont use on the main app, graphql request bodies are lost
router.all(yoga_js_1.yoga.graphqlEndpoint, (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield next();
}));
router.use(yoga_js_1.yoga.graphqlEndpoint, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, yoga_js_1.yogaMiddleware)(ctx);
}));
router.get('/test', (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const awa = yield notification_1.NotificationsRepositoryImpl.delete(3);
    ctx.type = 'application/json; charset=utf-8';
    ctx.body = {
        awa
    };
    yield next();
}));
router.use('/test', bodyParser());
app
    .use(router.routes())
    .use(router.allowedMethods());
const server = app.listen(5555, () => {
    console.info('Api-Gateway listening on port 5555');
    console.info(`graphql endpoint: ${yoga_js_1.yoga.graphqlEndpoint}`);
});
const shutdown = (signal) => {
    return new Promise((resolve) => {
        console.info(`\nApi-Gateway received ${signal}. starting cleanup...`);
        // Close connections here
        console.info('Api-Gateway cleanup finished');
        resolve();
    });
};
const finalShutdown = () => {
    console.info('Api-Gateway shutdown finished');
};
gracefulShutdown(server, {
    signals: 'SIGINT SIGTERM',
    timeout: 2000,
    development: false,
    onShutdown: shutdown,
    finally: finalShutdown
});
