import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { HTTP_ROOT } from 'src/app/href-constants.constants';
import { Address } from 'src/app/models/address.model';

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
        dateofbirth: undefined,
        age: undefined,
        address: undefined
    };

    hasError = false;
    errorMessage = '';
    submitted = false;

    constructor(private customerService: CustomerService) { }

    ngOnInit(): void {
        this.customer.address = new Address();
    }

    addCustomer() : void {
        const data = CustomerService.datafyCustomer(this.customer, false);
        console.warn(data.address);

        console.log("Adding customer with info " + data);

        this.customerService.addCustomer(data)
        .subscribe({
            next: (res) => {
                console.log(res);
                this.submitted = true;
                this.hasError = false;
                this.delayedReload();
            },
            error: (e) => {
                console.error(e);
                this.hasError = true;
                console.log(e.error.status + " " + e.error.title);
                this.errorMessage = e.error.status + " " + e.error.title;
            }
        });
    }

    delayedReload() : void {
        setTimeout(() => {
            window.location.href=HTTP_ROOT + "customer/add";
          }, 5000);
    }
}
