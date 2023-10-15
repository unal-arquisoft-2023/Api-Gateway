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
import { regMedTypeDef, regMedsMutations, regMedsQueries } from './registrosMedicos/typeDefsRegMed';

import regMedResolvers from './registrosMedicos/resolverRegMed';
import appointmentsResolvers from './appointments/resolverAppointment';
import { availabilityMutations, availabilityQueries, doctorAvailabilityTypeDef } from './appointments/typeDefsAppointment';
import { authQueries, typeDefsAuth } from './auth/typeDefsAuth';
import authResolvers from './auth/resolverAuth';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		notificationTypeDef,
		userTypeDef,
    regMedTypeDef,
    doctorAvailabilityTypeDef,
	],
	[
		notificationsQueries,
		usersQueries,
    regMedsQueries,
    availabilityQueries,
	],
	[
		notificationsMutations,
		usersMutations,
    regMedsMutations,
    availabilityMutations,
	]
);

// TODO: HERE SHOULD ONLY BE USERS
// BUT IT ERRORS OUT IF I DOESNT INCLUDE
// A RESOLVER WITH AT LEAST ONE MUTATION
const authRawSchema = mergeSchemas(
  [
    'scalar JSON',
    typeDefsAuth,
		userTypeDef,
  ],
  [
    authQueries,
		usersQueries,
  ],
  [
		usersMutations,
  ]
);


export const authSchema = makeExecutableSchema({
  typeDefs: authRawSchema,
  resolvers: merge(
    {JSON: GraphQLJSON},
    authResolvers,
    userResolvers,
  )
})

console.log("wawa")


// Generate the schema object from your types definition.
export const generalSchema = makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		notificationResolvers,
		userResolvers,
    regMedResolvers,
    appointmentsResolvers,
	)
});
