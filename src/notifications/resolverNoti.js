import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './serverNoti';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
  Mutation: {
    generateNotificationsForAppointment: (_, { notification }) =>
      generalRequest(`${URL}`, 'POST', notification),
    deleteAppNotificationById: (_, { id }) =>
      generalRequest(`${URL}/${id}`, 'DELETE', Int),
    sendEmail: (_, { notification }) =>
      generalRequest(`${URL}/EMAIL`, 'POST', notification),
    sendSMS: async (_, { notification }) => {
      console.log("Send sms")
      console.log(notification)
      const res = await generalRequest(`${URL}/SMS`, 'POST', notification)
      console.log(res)
      return res;
    }
  }
};

export default resolvers;
