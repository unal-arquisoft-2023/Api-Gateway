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
const users_1 = require("../../../resources/users");
/*
enum Specialty {
    GeneralMedicine
    Pediatrics
    Cardiology
    Orthopedics
    Dermatology
    Gastroenterology
    Neurology
    Ophtalmology
    Oncology
    Otolaryngology
    Urology
    Psychiatry
    Obstetrics
    Gynecology
    Anesthesiology
    Radiology
    Pathology
    Emergency
    FamilyMedicine
    InternalMedicine
    Surgery
    Other
}
*/
const allSpecialties = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    return [
        users_1.Specialty.Pediatrics,
        users_1.Specialty.Cardiology,
        users_1.Specialty.Orthopedics,
        users_1.Specialty.Dermatology,
        users_1.Specialty.Gastroenterology,
        users_1.Specialty.Neurology,
        users_1.Specialty.Oncology,
        users_1.Specialty.Otolaryngology,
        users_1.Specialty.Urology,
        users_1.Specialty.Psychiatry,
        users_1.Specialty.Obstetrics,
        users_1.Specialty.Gynecology,
        users_1.Specialty.Anesthesiology,
        users_1.Specialty.Radiology,
        users_1.Specialty.Pathology,
        users_1.Specialty.Emergency,
        users_1.Specialty.Surgery,
        users_1.Specialty.Other
    ];
});
exports.default = allSpecialties;
