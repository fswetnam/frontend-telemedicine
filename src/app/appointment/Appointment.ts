import { Time } from "@angular/common";
import { Doctor } from "../doctor/Doctor";
import { AppointMentType } from "../enumeration/AppointmentType";
import { Patient } from "../patient/Patient";

export interface Appointment{
    id: number,
    dateScheduled: string,
    schedule: Date,
    purpose: string,
    patient: Patient,
    doctor: Doctor,
    appointmentType: AppointMentType
}