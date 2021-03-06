import { Doctor } from "../doctor/Doctor";
import { Patient } from "../patient/Patient";

export interface Prescription{
    id: number,
    name: string,
    dosages: string,
    description: string,
    patient: Patient,
    doctorPrescribed: Doctor
}