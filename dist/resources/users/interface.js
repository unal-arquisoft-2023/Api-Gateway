"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Specialty = exports.Affiliation = exports.UserStatus = void 0;
var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "ACTIVE";
    UserStatus["SUSPENDED"] = "SUSPENDED";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
var Affiliation;
(function (Affiliation) {
    Affiliation["PUBLIC"] = "PUBLIC";
    Affiliation["PRIVATE"] = "PRIVATE";
    Affiliation["INSURANCE"] = "INSURANCE";
})(Affiliation || (exports.Affiliation = Affiliation = {}));
var Specialty;
(function (Specialty) {
    Specialty["GeneralMedicine"] = "General Medicine";
    Specialty["Pediatrics"] = "Pediatrics";
    Specialty["Cardiology"] = "Cardiology";
    Specialty["Orthopedics"] = "Orthopedics";
    Specialty["Dermatology"] = "Dermatology";
    Specialty["Gastroenterology"] = "Gastroenterology";
    Specialty["Neurology"] = "Neurology";
    Specialty["Ophthalmology"] = "Ophthalmology";
    Specialty["Oncology"] = "Oncology";
    Specialty["Otolaryngology"] = "Otolaryngology";
    Specialty["Urology"] = "Urology";
    Specialty["Psychiatry"] = "Psychiatry";
    Specialty["Obstetrics"] = "Obstetrics";
    Specialty["Gynecology"] = "Gynecology";
    Specialty["Anesthesiology"] = "Anesthesiology";
    Specialty["Radiology"] = "Radiology";
    Specialty["Pathology"] = "Pathology";
    Specialty["Emergency"] = "Emergency";
    Specialty["FamilyMedicine"] = "Family Medicine";
    Specialty["InternalMedicine"] = "Internal Medicine";
    Specialty["Surgery"] = "Surgery";
    Specialty["Other"] = "Other";
})(Specialty || (exports.Specialty = Specialty = {}));
