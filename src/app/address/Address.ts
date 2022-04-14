import { Doctor } from "../doctor/Doctor"
import { Patient } from "../patient/Patient"

export interface Address{
    id: number,
    zipcode: string,
    streetAddress: string,
    city: string,
    usState: string,
    patient: Patient,
    doctor: Doctor
}