import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";
import { Address } from "./Address";
import { AddressService } from "./address.service";
@Component({
    selector: 'app-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit{
    
    addressState = new BehaviorSubject<Address>(null);
    address$ = this.addressState.asObservable().subscribe();

    addresses!: Address[];
    address!: Address;
    message: any;
    constructor(private addressService: AddressService) {}

    ngOnInit(): void {
        this.getAddresses();
    }

    public getAddresses() {
        this.addressService.getAddresses().subscribe((data: Address[]) => {
            console.log(data);
            this.addresses = data;
        });
    }

    public save(form: NgForm){
        const response =  this.addressService.saveAddress(form.value as Address).subscribe((data) => {
            this.message = data
            this.getAddresses();
            form.reset();
        });
        return response;
    }

    public delete(address: Address){
        this.addressService.deleteAddress(address.id).subscribe((data) => {
            this.message = data
            this.getAddresses();
        });
    }

    public update(form: NgForm){
        const response = this.addressService.updateAddress(form.value as Address, this.address.id).subscribe((data) => {
            this.message = data
            this.getAddresses();        
            form.reset();
        });

        return response;
    }

    public setAddress(address: Address) {
        console.log(address);
        this.address = address;
    }
}