import { Specialty } from "../users";

export type CreateAppointmentRequestDTO = {
  patient_id: string;
  doctor_id: string;
  date: Date;
  specialty: string;
  block_id: number;
}

export type CreateAppointmentResponseDTO = {
  appointment_id: string;
}

export enum AppointmentStatus {
  PENDING = "Pending",
  CANCELED = "Canceled",
  MISSED = "Missed",
}

export type BookedAppointment = {
  id: string;
  patient_id: string;
  doctor_id: string;
  date: Date;
  specialty: Specialty;
  block_id: number;
  medical_record_id: number;
  date_of_scheduling: string;
  status: AppointmentStatus;
}

export type TimeBlock = {
  id: number;
  start: string;
  end: string;
}

export type AvailableAppointment = {
  date: Date;
  block: TimeBlock;
  doctor_id: string;
}

export interface AppointmentsRepository {
  create(data: CreateAppointmentRequestDTO): Promise<CreateAppointmentResponseDTO>;
  findByPatientId(patient_id: string): Promise<BookedAppointment[]>;
  findBySpecialty(specialty: string): Promise<AvailableAppointment[]>;
}