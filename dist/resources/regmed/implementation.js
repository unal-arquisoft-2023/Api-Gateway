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
exports.regmedRepoMs = void 0;
const axios_1 = require("axios");
const regmedAxios = axios_1.default.create({
    baseURL: process.env.REGMED_API,
});
regmedAxios.interceptors.request.use(request => {
    console.log('Starting Request on REGMED: ', JSON.stringify(request, null, 2));
    return request;
});
exports.regmedRepoMs = {
    get: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield regmedAxios.get(`/get/${id}`);
        return response === null || response === void 0 ? void 0 : response.data.data;
    }),
    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield regmedAxios.get("/getAll");
        return response === null || response === void 0 ? void 0 : response.data.data;
    }),
    getMany: (ids) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield regmedAxios.post("/getMany", { ids });
        return response === null || response === void 0 ? void 0 : response.data.data;
    }),
    create: (detail) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield regmedAxios.post("/create", {
            detail
        });
        return response === null || response === void 0 ? void 0 : response.data.data;
    }),
    update: (id, detail) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield regmedAxios.put(`/update/${id}`, { detail });
        return response === null || response === void 0 ? void 0 : response.data.data;
    }),
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield regmedAxios.delete(`/delete/${id}`);
        return response === null || response === void 0 ? void 0 : response.data.data;
    })
};
