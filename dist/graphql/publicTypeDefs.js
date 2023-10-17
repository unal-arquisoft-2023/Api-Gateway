"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicTypeDefs = void 0;
exports.publicTypeDefs = `
scalar LocalDate @specifiedBy(url: "https://scalars.graphql.org/andimarek/local-date")


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

type TimeBlock {
  id: Int!
  startTime: String!
  endTime: String!
}

type DoctorDisplay {
  id: String!
  name: String!
  specialty: Specialty!
}

type AvailableAppointment {
  doctor: DoctorDisplay!
  date: LocalDate!
  timeBlock: TimeBlock!
}

enum AppointmentStatus {
  PENDING,
  ASSISTED,
  CANCELLED,
  MISSED
}

type BookedAppointment {
  id: Int!
  doctor: DoctorDisplay!
  date: LocalDate!
  timeBlock: TimeBlock!
  type: AppointmentStatus!
}

type MedicalRegistry {
  id: Int!
  symptoms: String!
  diagnosis: String!
  treatment: String!
  observations: String!
  prescription: String!
}
enum AffiliationType {
  PUBLIC,
  PRIVATE,
  INSURANCE
}

type PatientData {
  id: String!
  cardId: String!
  name: String!
  affiliation:  AffiliationType!
  affiliationDate: LocalDate!
}

type LoginReponse {
  token: String!
  tokenType: String!
}

# mutation
type Mutation {
  # Without token, this one uses other route
  login(cardId: String!, password: String!): LoginReponse!

  # With token
  changePassword(oldPassword: String!, newPassword: String!): Boolean!
  logout: Boolean!


  bookAppointment(doctorId: String!, date: LocalDate!, timeBlockId: Int!): Boolean!
  cancelAppointment(appointmentId: Int!): Boolean!
}



type Query {

  # With token
  allSpecialties: [Specialty!]!

  availableAppointments(specialty: Specialty!, startDate: LocalDate!, endDate: LocalDate!): [AvailableAppointment!]!

  # If start date is null, it will bring all appointmet from until end date
  # if end date is null, it will bring all appointments from start date to now
  # if both are null, it will bring all
  myAppointments(startDate: LocalDate, endDate: LocalDate, types: [AppointmentStatus!]!): [BookedAppointment!]!
  myInfo: PatientData!
  medicalRegistryById(appointmentId: Int!): MedicalRegistry!

}
`;
