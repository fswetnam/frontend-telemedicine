import { Requests } from "../requests/Requests";

export interface Admin{
    id: number,
    requestedAppointments: Requests[]
}