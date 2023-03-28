import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

    private baseUrl = "http://localhost:8080/customer";

    constructor(private http: HttpClient) { }

    /* To implement:
    - Add Customer
        - View Customer
    - Update Customer
    - All Customers
        - Click to View Customer?
    - Find Customer by Name
        - Also to View Customer
    */

    addCustomer(data: any): Observable<any> {
        return this.http.post<Customer>(this.baseUrl, data, {observe: 'response'});
    }

    getCustomer(id: any): Observable<any> {
        return this.http.get<Customer>(this.baseUrl + "/" + id);
    }



    public static datafyCustomer(customer:Customer, includeId:boolean) {
        if (includeId) {
            const data = {
                id: customer.id,
                firstName: customer.firstname,
                lastName: customer.lastname,
                age: customer.age,
                address: customer.address
            };
            return data;
        }

        const data = {
            firstName: customer.firstname,
            lastName: customer.lastname,
            age: customer.age,
            address: customer.address
        };
        return data;
    }

    public static custofyData(data:any) {
        const customer = {
            id: data.id,
            firstname: data.firstName,
            lastname: data.lastName,
            age: data.age,
            address: data.address
        }
        return customer;
    }
}
