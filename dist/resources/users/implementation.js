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
exports.doctorRepoMs = exports.patientRepoMs = exports.staffRepoMs = void 0;
const axios_1 = require("axios");
const usersAxios = axios_1.default.create({
    baseURL: process.env.USERS_API,
});
usersAxios.interceptors.request.use(request => {
    console.log('Starting Request', JSON.stringify(request, null, 2));
    return request;
});
exports.staffRepoMs = {
    get: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield usersAxios.get(`/staff/${id}`);
        return response.data;
    }),
    create: (staff) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield usersAxios.post("/staff", staff);
        return response.data;
    }),
    update: (staff) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield usersAxios.put(`/staff/${staff.id}`, staff);
        return response.data;
    })
};
exports.patientRepoMs = {
    get: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield usersAxios.get(`/patient/${id}`);
        console.log(`patientRepoMs.get(${id})`, response.data);
        return response.data;
    }),
    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield usersAxios.get("/patients");
        return response.data;
    }),
    create: (patient) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield usersAxios.post("/patient", patient);
        return response.data;
    }),
    update: (patient) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield usersAxios.put(`/patient/${patient.id}`, patient);
        return response.data;
    })
};
exports.doctorRepoMs = {
    get: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield usersAxios.get(`/doctor/${id}`);
        return response.data;
    }),
    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield usersAxios.get("/doctors");
        return response.data;
    }),
    getAllBySpecialty: (specialty) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield usersAxios.get(`/doctors?specialty=${specialty}`);
        return response.data;
    }),
    create: (doctor) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield usersAxios.post("/doctor", doctor);
        return response.data;
    }),
    update: (doctor) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield usersAxios.put(`/doctor/${doctor.id}`, doctor);
        return response.data;
    })
};
