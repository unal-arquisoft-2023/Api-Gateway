"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsRepoMs = void 0;
const axios_1 = require("axios");
const appointmentsAxios = axios_1.default.create({
    baseURL: process.env.APPOINTMENTS_API, // 'http://:host/api/appointments'
});
appointmentsAxios.interceptors.request.use((request) => {
    console.log('Starting Request in Appointments', JSON.stringify(request, null, 2));
    return request;
});
exports.AppointmentsRepoMs = {
    create: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield appointmentsAxios.post('/appointment', Object.assign(Object.assign({}, data), { date: data.date.toISOString().split('T')[0] }));
        return response.data;
    }),
    findByPatientId: (patient_id) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield appointmentsAxios.get(`/appointments?patient_id=${patient_id}`);
        response.data.forEach(element => {
            element.date = new Date(element.date);
        });
        return response.data;
    }),
    findBySpecialty: (specialty) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield appointmentsAxios.get(`/appointments?specialty=${specialty}`);
        response.data.forEach(element => {
            element.date = new Date(element.date);
        });
        return response.data;
    })
};
