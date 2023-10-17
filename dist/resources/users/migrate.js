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
exports.migrate = void 0;
const _1 = require(".");
const migrate = () => __awaiter(void 0, void 0, void 0, function* () {
    const newStaff = {
        name: {
            firstName: "John",
            lastName: "Doe"
        },
        email: "juan@example.com",
        phone: "+1234567890",
        location: {
            country: "Argentina",
            city: "Buenos Aires",
            address: "123 Calle Principal"
        },
        position: "manager",
        dateOfBirth: new Date(Date.parse("1990-01-15")),
        registrationDate: new Date(Date.parse("2022-09-07")),
        status: _1.UserStatus.ACTIVE,
        cardId: "12345678"
    };
    const newRes = yield _1.staffRepoMs.create(newStaff);
    // const getRes = await staffRepoMs.get(newRes.id);
    // const updatedStaff: Staff = {...newStaff, id: newRes.id};
    // updatedStaff.name.firstName = "Jane";
    // updatedStaff.position = "director";
    // const updateRes = await staffRepoMs.update(updatedStaff);
    const newPatient = {
        name: {
            firstName: "Fulano",
            lastName: "De tal"
        },
        email: "fuldetal@mail.com",
        phone: "+1234567890",
        location: {
            country: "Colombia",
            city: "Bogota",
            address: "UNAL"
        },
        dateOfBirth: new Date(Date.parse("1995-10-15")),
        registrationDate: new Date(Date.parse("2022-09-07")),
        status: _1.UserStatus.ACTIVE,
        cardId: "12345678",
        affiliation: _1.Affiliation.PUBLIC,
    };
    const newPatientRes = yield _1.patientRepoMs.create(newPatient);
    // const getPatientRes = await patientRepoMs.get(newPatientRes.id);
    // const updatedPatient: Patient = {...newPatient, id: newPatientRes.id};
    // updatedPatient.name.firstName = "Mengano";
    // updatedPatient.affiliation = Affiliation.PRIVATE;
    // const updatePatientRes = await patientRepoMs.update(updatedPatient);
    const newDoctor = {
        name: {
            firstName: "Gregorio",
            lastName: "Hernandez"
        },
        email: "greher@mail.com",
        phone: "+1234567890",
        location: {
            country: "Colombia",
            city: "Bogota",
            address: "UNAL"
        },
        dateOfBirth: new Date(Date.parse("1970-02-19")),
        registrationDate: new Date(Date.parse("2022-09-07")),
        status: _1.UserStatus.ACTIVE,
        cardId: "12345678",
        specialty: _1.Specialty.GeneralMedicine,
        medicalLicenseId: "12345678"
    };
    const newDocRes = yield _1.doctorRepoMs.create(newDoctor);
    // const getDocRes = await doctorRepoMs.get(newDocRes.id);
    // const updatedDoctor: Doctor = {...newDoctor, id: newDocRes.id};
    // updatedDoctor.name.firstName = "Jose Gregorio";
    // updatedDoctor.specialty = Specialty.Pediatrics;
    // const updateDocRes = await doctorRepoMs.update(updatedDoctor);
    // const updatedDocRed = await doctorRepoMs.get(updatedDoctor.id);
});
exports.migrate = migrate;
