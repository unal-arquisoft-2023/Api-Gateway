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
exports.authRepoMs = void 0;
const axios_1 = require("axios");
const authAxios = axios_1.default.create({
    baseURL: process.env.AUTH_API,
});
exports.authRepoMs = {
    login: (username, password) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("authRepoMs.login");
        const formdata = new FormData();
        formdata.append('username', username);
        formdata.append('password', password);
        const response = yield authAxios.post("/token", formdata);
        return response.data;
    }),
    me: (token) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("authRepoMs.me");
        const response = yield authAxios.get("/status", { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    }),
    register: (username, password, userId, role) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("authRepoMs.register");
        const response = yield authAxios.post("/register", { username, password, user_id: userId, role: role });
        return response.data;
    })
};
