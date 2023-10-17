import axios from "axios";
import { DoctorsRepository, Patient, PatientsRepository, StaffRepository } from "./interface";

const usersAxios = axios.create({
  baseURL: process.env.USERS_API,
})

usersAxios.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2))
  return request
})
export const staffRepoMs: StaffRepository  = {

  get: async (id) => {
    const response = await usersAxios.get(`/staff/${id}`);
    return response.data;
  },

  create: async (staff) => {
    const response = await usersAxios.post("/staff", staff);
    return response.data;
  },

  update: async (staff) => {
    const response = await usersAxios.put(`/staff/${staff.id}`, staff);
    return response.data;
  }

}

export const patientRepoMs: PatientsRepository  = {
  get: async (id) => {
    const response = await usersAxios.get(`/patient/${id}`);
    console.log(`patientRepoMs.get(${id})`, response.data);
    return response.data;
  },

  getAll: async () => {
    const response = await usersAxios.get("/patients");
    return response.data;
  },

  create: async (patient) => {
    const response = await usersAxios.post("/patient", patient);
    return response.data;
  },

  update: async (patient) => {
    const response = await usersAxios.put(`/patient/${patient.id}`, patient);
    return response.data;
  }
}


export const doctorRepoMs: DoctorsRepository = {
  get: async (id) => {
    const response = await usersAxios.get(`/doctor/${id}`);
    return response.data;
  },

  getAll: async () => {
    const response = await usersAxios.get("/doctors");
    return response.data;
  },

  getAllBySpecialty: async (specialty) => {
    const response = await usersAxios.get(`/doctors?specialty=${specialty}`);
    return response.data;
  },

  create: async (doctor) => {
    const response = await usersAxios.post("/doctor", doctor);
    return response.data;
  },

  update: async (doctor) => {
    const response = await usersAxios.put(`/doctor/${doctor.id}`, doctor);
    return response.data;
  }
}