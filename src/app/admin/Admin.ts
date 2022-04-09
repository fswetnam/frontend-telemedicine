import { Requests } from "../requests/Requests";

export interface Admin{
    id: number,
    fname?: string,
    lname?: string,
    userpassword: string,
    email: string,
    cellphone: string,
    requestedAppointments: Requests[]
}