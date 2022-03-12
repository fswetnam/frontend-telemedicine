import { UserType } from "../enumeration/UserType";

export interface User{
    id: number,
    lname: string,
    fname: string,
    userName: string,
    userpassword: string,
    userType: UserType,
    email: string,
    cellphone: string
}