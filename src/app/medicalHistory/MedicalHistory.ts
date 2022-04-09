import { Patient } from "../patient/Patient";

export interface MedicalHistory {
    id: number,
    name: string,
    doctorDiagnosed: string,
    dateDiagnosed: Date,
    description: string,
    state: number,
    patient: Patient
}