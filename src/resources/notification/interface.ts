import { Specialty } from "../users";

export type AppointmentNotify = {
    appointmentId: number;
    date: string;
    patientID: number;
    specialty: Specialty; 
}

export type NotificationFormat = {
    contact: string;
    message: string;
}

export enum Status {
    NOTIFIED = "NOTIFIED",
    PARTIAL = "PARTIAL",
    UNNOTIFIED = "UNNOTIFIED"
}

export enum Medium {
    SMS = "SMS",
    GMAIL = "GMAIL",
    CALL = "CALL",
    WAPP = "WAPP"
}

export type Notification = {
    id: number;
    message: string;
    date: string;
    type: Medium;
    seen: boolean;
}

export type NotificationResponse = {
    id: number;
    appointmentId: number;
    status: Status;
    notifications: Notification[];
    dateSchedule: string;
}

export interface NotificationsRepository {
    create(appointment: AppointmentNotify): Promise<NotificationResponse | null>;
    delete(id: number): Promise<number | null>;
    pushSMS(info: NotificationFormat): Promise<string>;
    pushEmail(info: NotificationFormat): Promise<string>;
}