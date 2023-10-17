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
const appointments_1 = require("../../../resources/appointments");
const auth_1 = require("../../../resources/auth");
const users_1 = require("../../../resources/users");
const getDoctor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const doctor = yield users_1.doctorRepoMs.get(id);
    return {
        id: doctor.id,
        name: doctor.name.firstName + " " + doctor.name.lastName,
        specialty: doctor.specialty
    };
});
const myAppointments = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenRaw = context.request.header.authorization;
    // extract token from "Bearer <token>"
    const token = tokenRaw.split(" ")[1];
    const { userId } = yield auth_1.authRepoMs.me(token);
    const apps = yield appointments_1.AppointmentsRepoMs.findByPatientId(userId);
    const startDate = new Date(args.startDate);
    const endDate = new Date(args.endDate);
    const res = apps
        .filter(app => {
        return app.date >= startDate &&
            app.date <= endDate &&
            args.types.indexOf(app.status.toUpperCase()) != -1;
    })
        .map((app) => __awaiter(void 0, void 0, void 0, function* () {
        return ({
            id: app.id,
            date: app.date,
            type: app.status.toUpperCase(),
            doctor: yield getDoctor(app.doctor_id)
        });
    }));
    return yield Promise.all(res);
});
exports.default = myAppointments;
