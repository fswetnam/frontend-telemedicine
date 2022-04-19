import { Admin } from "../admin/Admin";
import { Doctor } from "../doctor/Doctor";
import { LoginComponent } from "../login/login.component";
import { Patient } from "../patient/Patient";

export interface Report{
    id: number,
    name: string,
    type: string,
    url: string,
    size: number
}