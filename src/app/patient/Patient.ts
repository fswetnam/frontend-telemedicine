import { Address } from "../address/Address";
import { Appointment } from "../appointment/Appointment";
import { Doctor } from "../doctor/Doctor";
import { Insurance } from "../insurance/Insurance";
import { MedicalHistory } from "../medicalHistory/MedicalHistory";
import { Prescription } from "../prescription/Prescription";
import { Report } from "../report/Report";
import { Requests } from "../requests/Requests";

export interface Patient{
    id: number,
    fname?: string,
    lname?: string,
    email?: string,
    cellphone?: string,
    userpassword?: string,
    dob?: string,
    isInsured: boolean,
    medicalHistory?: MedicalHistory[],
    insurance?:Insurance[],
    address?: Address,
    appointments?: Appointment[],
    prescriptions?: Prescription[],
    requests?: Requests[]
}