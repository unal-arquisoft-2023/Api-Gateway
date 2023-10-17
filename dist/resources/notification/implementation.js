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
exports.NotificationsRepositoryImpl = void 0;
const axios_1 = require("axios");
const notiAxios = axios_1.default.create({
    baseURL: process.env.NOTIFICATION_API, // 'http://:host/api/notification'
});
notiAxios.interceptors.request.use(request => {
    console.log('Starting Request in Notifications', JSON.stringify(request, null, 2));
    return request;
});
exports.NotificationsRepositoryImpl = {
    create: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield notiAxios.post('', data);
        return response.data;
    }),
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield notiAxios.delete(`/${id}`);
        return response.data;
    }),
    pushEmail: (info) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield notiAxios.post('/EMAIL', info);
        return response.data;
    }),
    pushSMS: (info) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield notiAxios.post('/SMS', info);
        return response.data;
    })
};
