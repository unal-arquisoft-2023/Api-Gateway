
import { addParams, generalRequest, getRequest } from '../utilities';
import { url, port } from './serverAppointment';

const URL = `http://${url}:${port}`;

const printPromiseAndReturn = (promise) => promise.then((data) => {console.log(data); return data;});

const resolvers = {
  Query: {
    availabilityBySpecialtyAndDate: async (_, { specialty, date }) => {
     const res = await generalRequest(`${URL}/availability/${specialty}/${date}`, 'GET')
     const arr = [...Object.values(res)];
     return arr;
    },
    availabilityCanBook: (_, { doctorId, specialty, date, timeId }) =>
      generalRequest(`${URL}/availability/canBook/${doctorId}/${specialty}/${date}/${timeId}`, 'GET')
  },
  Mutation: {
    updateAvailability: async (_,  {doctorId, specialty, newAvailability}) => {
      await generalRequest(`${URL}/availability/${doctorId}/${specialty}`, 'POST', newAvailability)
      return true;
    },
    createAppointment: async (_, { appointment }) => {
      const actualBody = {
        "patient_id": appointment.patientId,
        "doctor_id": appointment.doctorId,
        "date": appointment.date,
        "specialty": appointment.specialty,
        "block_id": appointment.timeId
      }
      const res = await generalRequest(`${URL}/appointment`, 'POST', actualBody)
      return {appointmentId: res.appointment_id};
    },

    cancelAppointment: async (_,  {appointmentId}) => {
      await generalRequest(`${URL}/appointment/${appointmentId}/cancel`, 'POST')
      return true;
    },
    attendAppointment: async (_,  {appointmentId}) => {
      await generalRequest(`${URL}/appointment/${appointmentId}/attend`, 'POST')
      return true;
    },

    findAppointment: async (_,  {appointmentId}) => {
      const res = await generalRequest(`${URL}/appointment/${appointmentId}`, 'GET')
      const actualRes = {
        "patientId": res.patient_id,
        "doctorId": res.doctor_id,
        "date": res.date,
        "specialty": res.specialty,
        "timeId": res.block_id
      }
      return actualRes;
    }
  }
};

export default resolvers;