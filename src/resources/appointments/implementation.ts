import axios from "axios";

import { AppointmentsRepository } from "./interface";

const appointmentsAxios = axios.create({
    baseURL: process.env.APPOINTMENTS_API, // 'http://:host/api/appointments'
})

appointmentsAxios.interceptors.request.use((request) => {

    console.log('Starting Request in Appointments', JSON.stringify(request, null, 2))
    return request
})

export const AppointmentsRepoMs: AppointmentsRepository = {
    create: async (data) => {
        const response = await appointmentsAxios.post('/appointment', {...data, date: data.date.toISOString().split('T')[0]})
        return response.data
    },
    findByPatientId: async (patient_id) => {
        const response = await appointmentsAxios.get(`/appointments?patient_id=${patient_id}`)
        response.data.forEach(element => {
          element.date = new Date(element.date)
        });
        return response.data
    },
    findBySpecialty: async (specialty) => {
        const response = await appointmentsAxios.get(`/appointments?specialty=${specialty}`)
        response.data.forEach(element => {
          element.date = new Date(element.date)
        });
        return response.data
    }
}

