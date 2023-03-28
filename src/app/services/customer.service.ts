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
}
