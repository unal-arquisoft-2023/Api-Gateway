import { addParams, generalRequest, getRequest } from '../utilities';
import { url, port } from './serverUser';

const URL = `http://${url}:${port}`;

const getDataData = (promise) => promise.then((data) => data.data.data);

const resolvers = {
  Query: {
    allDoctors: (_) =>
      getDataData(getRequest(`${URL}/doctors`, '')),
    allPatients: (_) =>
      getRequest(`${URL}/patients`, ''),
    doctorById: (_, { id }) =>
      generalRequest(`${URL}/doctor/${id}`, 'GET'),
    patientById: (_, { id }) =>
      generalRequest(`${URL}/patient/${id}`, 'GET'),
    staffById: (_, { id }) =>
      getDataData(generalRequest(`${URL}/staff/${id}`, 'GET')),
    doctorBySpecialty: (_, { specialty }) => {
      const f = async () => {
        const url = addParams(`${URL}/doctors`, { specialty })
        console.log(url)
        const res = await generalRequest(url, 'GET')
        console.log(res)
        return res.data.data
      }
      return f();
    }

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
