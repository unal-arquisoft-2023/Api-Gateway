import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import { notificationTypeDef,
	notificationsQueries,
	notificationsMutations } from './notifications/typeDefsNotification';

import notificationResolvers from './notifications/resolverNoti';

import { userTypeDef, usersQueries, usersMutations } from './users/typeDefsUsers';

import userResolvers from './users/resolverUser';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		notificationTypeDef,
		userTypeDef
	],
	[
		notificationsQueries,
		usersQueries
	],
	[
		notificationsMutations,
		usersMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		notificationResolvers,
		userResolvers
	)
});
