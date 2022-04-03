import { Admin } from "../admin/Admin";
import { AdminappComponent } from "../adminapp/adminapp.component";
import { Appointment } from "../appointment/Appointment";
import { Doctor } from "../doctor/Doctor";
import { AppointMentType } from "../enumeration/AppointmentType";
import { RequestStatus } from "../enumeration/RequestStatus";
import { RequestType } from "../enumeration/RequestType";
import { Patient } from "../patient/Patient";
import { Prescription } from "../prescription/Prescription";

export interface Requests{
    id: number,
    prescriptionRequest: Prescription,
    appointmentRequest: Appointment,
    requestType: RequestType,
    requestStatus: RequestStatus,
    appointmentType: AppointMentType,
    requestingPatient: Patient,
    admin: Admin,
    doctor: Doctor,
    dID: number,
    pID: number,
    aID: number
}