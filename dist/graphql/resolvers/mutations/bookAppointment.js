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
const bookAppointment = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenRaw = context.request.header.authorization;
    // extract token from "Bearer <token>"
    const token = tokenRaw.split(" ")[1];
    const { userId } = yield auth_1.authRepoMs.me(token);
    try {
        console.log(args.date, new Date(args.date));
        const { specialty } = yield users_1.doctorRepoMs.get(args.doctorId);
        const apps = yield appointments_1.AppointmentsRepoMs.create({
            patient_id: userId,
            doctor_id: args.doctorId,
            specialty: specialty,
            date: new Date(args.date),
            block_id: args.timeBlockId
        });
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
});
exports.default = bookAppointment;
