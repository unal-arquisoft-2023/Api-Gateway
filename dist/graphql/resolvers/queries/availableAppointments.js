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
const users_1 = require("../../../resources/users");
const getDoctor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const doctor = yield users_1.doctorRepoMs.get(id);
    return {
        id: doctor.id,
        name: doctor.name.firstName + " " + doctor.name.lastName,
        specialty: doctor.specialty
    };
});
const availableAppointment = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const apps = yield appointments_1.AppointmentsRepoMs.findBySpecialty(args.specialty);
    console.log(apps);
    const startDate = new Date(args.startDate);
    const endDate = new Date(args.endDate);
    const res = apps
        .filter(app => {
        return app.date >= startDate &&
            app.date <= endDate;
    })
        .map((app) => __awaiter(void 0, void 0, void 0, function* () {
        return ({
            date: app.date,
            timeBlock: {
                id: app.block.id,
                startTime: app.block.start,
                endTime: app.block.end
            },
            doctor: yield getDoctor(app.doctor_id)
        });
    }));
    return yield Promise.all(res);
});
exports.default = availableAppointment;
