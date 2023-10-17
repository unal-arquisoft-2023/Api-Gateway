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
exports.yogaMiddleware = exports.yoga = void 0;
const mock_1 = require("@graphql-tools/mock");
const schema_1 = require("@graphql-tools/schema");
const graphql_yoga_1 = require("graphql-yoga");
const publicTypeDefs_1 = require("./publicTypeDefs");
const resolvers_1 = require("./resolvers");
const publicSchema = (0, schema_1.makeExecutableSchema)({
    typeDefs: publicTypeDefs_1.publicTypeDefs,
    resolvers: resolvers_1.default,
});
const mocks = {
    LocalDate: () => "2023-10-16",
};
const schemaWithMocks = (0, mock_1.addMocksToSchema)({ schema: publicSchema, preserveResolvers: true });
exports.yoga = (0, graphql_yoga_1.createYoga)({
    schema: schemaWithMocks,
    graphqlEndpoint: "/graphql",
    logging: 'debug'
});
const yogaMiddleware = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("yogaMiddleware");
    const response = yield exports.yoga.handleNodeRequest(ctx.req, ctx);
    ctx.status = response.status;
    response.headers.forEach((value, key) => {
        ctx.append(key, value);
    });
    ctx.body = response.body;
});
exports.yogaMiddleware = yogaMiddleware;
