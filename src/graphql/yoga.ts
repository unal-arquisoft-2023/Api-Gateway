import { loadFilesSync } from "@graphql-tools/load-files";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { createYoga } from "graphql-yoga";
import { publicTypeDefs } from "./publicTypeDefs";
import { authRepoMs } from "../resources/auth";
import { log } from "console";
import resolvers from "./resolvers";



const publicSchema = makeExecutableSchema({
  typeDefs: publicTypeDefs,
  resolvers: resolvers,
});

const mocks = {
  LocalDate: () => "2023-10-16",
}
const schemaWithMocks = addMocksToSchema({ schema: publicSchema, preserveResolvers: true });

export const yoga = createYoga({
  schema: schemaWithMocks,
  graphqlEndpoint: "/graphql",
  logging: 'debug'
})

export const yogaMiddleware = async ctx => {
  console.log("yogaMiddleware")
  const response = await yoga.handleNodeRequest(ctx.req, ctx);

  ctx.status = response.status;

  response.headers.forEach((value, key) => {
    ctx.append(key, value);
  });

  ctx.body = response.body;
}