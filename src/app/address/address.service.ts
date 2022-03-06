import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable} from "rxjs";
import { Address } from "./Address";

@Injectable({providedIn: 'root'})
export class AddressService{
    
    public url = "http://localhost:8080/address";

    constructor(private http: HttpClient){}

    getAddresses(): Observable<Address[]>{
        return this.http.get<Address[]>(`${this.url}` + 'es');
     }

    public saveAddress(address: Address) {
         return this.http.post(`${this.url}`, address, {responseType: 'text' as 'json'});
     }

    public deleteAddress(id: number){
        return this.http.delete(`${this.url}` + "/id=" + `${id}`);
    }

    public updateAddress(address: Address, id: number) {
        return this.http.put(`${this.url}` + "/id=" + `${id}`, address, {responseType: 'text' as 'json'});
    }
}