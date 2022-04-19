import { StringMap } from "@angular/compiler/src/compiler_facade_interface";
import { Address } from "../address/Address";
import { Appointment } from "../appointment/Appointment";
import { Patient } from "../patient/Patient";
import { Prescription } from "../prescription/Prescription";
import { Report } from "../report/Report";
import { Requests } from "../requests/Requests";

export interface Doctor{
    id: number,
    fname?: string,
    lname?: string,
    officeName?: string,
    specialty?: string,
    userpassword: string,
    email: string,
    cellphone: string,
    officeAddress?: Address,
    appointments?: Appointment,
    requests?: Requests[],
    prescribedPrescriptions?: Prescription[],
    reportIds: number[]
}