import { Doctor } from "../doctor/Doctor";
import { RequestStatus } from "../enumeration/RequestStatus";
import { RequestType } from "../enumeration/RequestType";
import { Patient } from "../patient/Patient";
import { Prescription } from "../prescription/Prescription";

export interface Requests{
    id: number,
    prescriptionRequest: Prescription,
    requestType: RequestType,
    requestStatus: RequestStatus,
    requestingPatient: Patient,
    doctor: Doctor,
    dID: number,
    pID: number
}