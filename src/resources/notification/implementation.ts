import axios from "axios";
import { NotificationsRepository } from "./interface";

const notiAxios = axios.create({
    baseURL: process.env.NOTIFICATION_API, // 'http://:host/api/notification'
})

notiAxios.interceptors.request.use(request => {
    console.log('Starting Request in Notifications', JSON.stringify(request, null, 2))
    return request
})

export const NotificationsRepositoryImpl: NotificationsRepository = {
    create: async (data) => {
        const response = await notiAxios.post('', data)
        return response.data
    },
    delete: async (id) => {
        const response = await notiAxios.delete(`/${id}`)
        return response.data
    },
    pushEmail: async (info) => {
        const response = await notiAxios.post('/EMAIL', info)
        return response.data
    },
    pushSMS: async (info) => {
        const response = await notiAxios.post('/SMS', info)
        return response.data
    }
}