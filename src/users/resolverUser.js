import { generalRequest, getRequest } from '../utilities';
import { url, port } from './serverUser';
import request from 'request-promise-native';

const URL = `http://${url}:${port}`;

const resolvers = {
    Query: {
        allDoctors: (_) =>
            getRequest(`${URL}/doctors`, ''),
        allPatients: (_) =>
            getRequest(`${URL}/patients`, ''),
        doctorById: (_, { id }) =>
            generalRequest(`${URL}/doctor/${id}`, 'GET'),
        patientById: (_, { id }) =>
            generalRequest(`${URL}/patient/${id}`, 'GET'),
        staffById: (_, { id }) =>
            generalRequest(`${URL}/staff/${id}`, 'GET'),
        doctorBySpeciality: (_, { speciality }) =>
            generalRequest(`${URL}/doctors?${speciality}`, 'GET'),
    },
    Mutation: {

        createStaff: (_, { staff }) =>
            generalRequest(`${URL}/staff`, 'POST', staff),
        createDoctor: (_, { doctor }) => 
            generalRequest(`${URL}/doctor`, 'POST', doctor),
        //generalRequest(`${URL}/doctor`, 'POST', doctor)},
        createPatient: (_, { patient }) =>
            generalRequest(`${URL}/patient`, 'POST', patient),
        updateStaff: (_, { id, staff }) =>
            generalRequest(`${URL}/staff/${id}`, 'PUT', staff),
        updateDoctor: (_, { id, doctor }) =>
            generalRequest(`${URL}/doctor/${id}`, 'PUT', doctor),
        updatePatient: (_, { id, patient }) =>
            generalRequest(`${URL}/patient/${id}`, 'PUT', patient),
    }
};

export default resolvers;
