import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

    customer:Customer = {
        id: undefined,
        firstname: undefined,
        lastname: undefined,
        age: undefined,
        address: undefined
    };

    hasError = false;
    errorMessage = '';
    submitted = false;

    constructor(private customerService: CustomerService) { }

    ngOnInit(): void {

    }

    addCustomer() : void {
        const data = CustomerService.datafyCustomer(this.customer, false);

        console.log("Adding customer with info " + data);

        this.customerService.addCustomer(data)
        .subscribe({
            next: (res) => {
                console.log(res);
                this.submitted = true;
            },
            error: (e) => {
                console.error(e);
                this.hasError = true;
                console.log(e.error.status + " " + e.error.title);
                this.errorMessage = e.error.status + " " + e.error.title;
            }
        });
    }

    datafyCustomer(includeId:boolean) : any {
        if (includeId) {
            const data = {
                id: this.customer.id,
                firstName: this.customer.firstname,
                lastName: this.customer.lastname,
                age: this.customer.age,
                address: this.customer.address
            };
            return data;
        }

        const data = {
            firstName: this.customer.firstname,
            lastName: this.customer.lastname,
            age: this.customer.age,
            address: this.customer.address
        };
        return data;
    }

}
