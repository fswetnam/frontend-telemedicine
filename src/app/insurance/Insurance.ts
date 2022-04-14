import { Patient } from "../patient/Patient";

export interface Insurance{
    id: number,
    name: string,
    memberId: string,
    allCareCoverage: boolean,
    consultingFeesCovered: boolean,
    percentInsured: number,
    patient: Patient
}