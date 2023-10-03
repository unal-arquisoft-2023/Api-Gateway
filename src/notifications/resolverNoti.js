import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './serverNoti';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Mutation: {
		generateNotificationsForAppointment: (_, { notification }) =>
			generalRequest(`${URL}`, 'POST', notification),
        deleteAppNotificationById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE', Int),
        sendSMS: (_, { notification }) =>
            generalRequest(`${URL}/SMS`, 'POST', notification),
        sendEmail: (_, { notification }) =>
            generalRequest(`${URL}/EMAIL`, 'POST', notification)
	}
};

export default resolvers;
