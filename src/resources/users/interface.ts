export enum UserStatus {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
}

export type Location = {
  country: string;
  city: string;
  address: string;
}

export type Name = {
  firstName: string;
  lastName: string;
}

export enum Affiliation {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  INSURANCE = "INSURANCE",
}

export enum Specialty {
  GeneralMedicine = "General Medicine",
  Pediatrics = "Pediatrics",
  Cardiology = "Cardiology",
  Orthopedics = "Orthopedics",
  Dermatology = "Dermatology",
  Gastroenterology = "Gastroenterology",
  Neurology = "Neurology",
  Ophthalmology = "Ophthalmology",
  Oncology = "Oncology",
  Otolaryngology = "Otolaryngology",
  Urology = "Urology",
  Psychiatry = "Psychiatry",
  Obstetrics = "Obstetrics",
  Gynecology = "Gynecology",
  Anesthesiology = "Anesthesiology",
  Radiology = "Radiology",
  Pathology = "Pathology",
  Emergency = "Emergency",
  FamilyMedicine = "Family Medicine",
  InternalMedicine = "Internal Medicine",
  Surgery = "Surgery",
  Other = "Other",
}

export type User = {
  id: string;
  name: Name;
  email: string;
  phone: string;
  location: Location;
  dateOfBirth: Date;
  registrationDate: Date;
  status: UserStatus;
  cardId: string;
}

export type Patient = User & {
  affiliation: Affiliation;
}

export type Doctor = User & {
  specialty: Specialty;
  medicalLicenseId: string;
}

export type Staff = User & {
  position: string;
}

export type CreationResponse = {
  id: string;
}

export interface StaffRepository {
  get(id: string): Promise<Staff | null>;
  create(staff: Omit<Staff,"id">): Promise<CreationResponse>;
  update(staff: Staff): Promise<string>;
}

export interface PatientsRepository {
  get(id: string): Promise<Patient | null>;
  getAll(): Promise<Patient[]>;
  create(patient: Omit<Patient,"id">): Promise<CreationResponse>;
  update(patient: Patient): Promise<string>;
}

export interface DoctorsRepository {
  get(id: string): Promise<Doctor | null>;
  getAll(): Promise<Doctor[]>;
  getAllBySpecialty(specialty: Specialty): Promise<Doctor[]>;
  create(doctor: Omit<Doctor,"id">): Promise<CreationResponse>;
  update(doctor: Doctor): Promise<string>;
}

