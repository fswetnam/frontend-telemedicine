import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

export interface Doctor{
    id: number,
    fname: string,
    lname: string,
    officeName: string,
    specialty: string,
    userpassword: string,
    email: string,
    cellphone: string
}