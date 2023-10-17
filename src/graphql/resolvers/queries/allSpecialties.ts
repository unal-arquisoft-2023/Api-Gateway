import { Specialty } from "../../../resources/users";

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
const allSpecialties = async (parent, args, context, info): Promise<Specialty[]> => {

  return [
    Specialty.Pediatrics,
    Specialty.Cardiology,
    Specialty.Orthopedics,
    Specialty.Dermatology,
    Specialty.Gastroenterology,
    Specialty.Neurology,
    Specialty.Oncology,
    Specialty.Otolaryngology,
    Specialty.Urology,
    Specialty.Psychiatry,
    Specialty.Obstetrics,
    Specialty.Gynecology,
    Specialty.Anesthesiology,
    Specialty.Radiology,
    Specialty.Pathology,
    Specialty.Emergency,
    Specialty.Surgery,
    Specialty.Other
    ];

};

export default allSpecialties;