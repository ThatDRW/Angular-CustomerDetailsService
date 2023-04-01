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

    getAllCustomers(): Observable<any> {
        return this.http.get<Array<Customer>>(this.baseUrl + "/all");
    }

    findCustomers(query: string | null) : Observable<any> {
        if (!query)
            return this.http.get<Array<Customer>>(this.baseUrl + "/find")
        return this.http.get<Array<Customer>>(this.baseUrl + "/find/" + query);
    }


    /*/* Demo Methods
    /*
    Proper naming conventions would have made datafyCustomer and custofyData
    methods obsolete in the case of this project. They are just here to show
    a possibly use-case for such 'conversion' methods. In case of connecting
    to exteral APIs, these can be implemented as 'Adaptors' to convert from-
    and to our own internal data structure and the external data structure.

    The implementation below also includes a boolean parameter includeId.
    This is used to differentiate between 'Adding New Customer' requests,
    and 'Update Existing Customer' ones.

    After the first code review, I also added the age calculation here.
    */
    public static datafyCustomer(customer:Customer, includeId:boolean) {
        if (includeId) {
            const data = {
                id: customer.id,
                firstName: customer.firstname,
                lastName: customer.lastname,
                dateOfBirth: customer.dateofbirth,
                address: customer.address
            };
            return data;
        }

        const data = {
            firstName: customer.firstname,
            lastName: customer.lastname,
            dateOfBirth: customer.dateofbirth,
            address: customer.address
        };
        return data;
    }

    public static custofyData(data:any) {
        let dateOfBirth = new Date(data.dateOfBirth);
        let timeDifference = Math.abs(Date.now() - dateOfBirth.getTime());
        let calculatedAge = Math.floor((timeDifference / (1000 * 3600 * 24))/365.25);

        const customer = {
            id: data.id,
            firstname: data.firstName,
            lastname: data.lastName,
            dateofbirth: data.dateOfBirth,
            age: calculatedAge,
            address: data.address
        }
        return customer;
    }
}
