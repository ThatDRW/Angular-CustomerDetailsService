import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

import { HTTP_ROOT } from 'src/app/href-constants.constants';

import { Address } from 'src/app/models/address.model';
import { ErrorResponseUtilService} from 'src/app/helpers/errorresponseutil.service';
import { NgbDate, NgbCalendarGregorian } from '@ng-bootstrap/ng-bootstrap';

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
    errorResponse = undefined;
    submitted = false;

    datePickerMaxDate : NgbDate;

    constructor(
        private customerService: CustomerService,
        private errorHelper: ErrorResponseUtilService,
    ) {
        let today = new NgbCalendarGregorian().getToday();
        this.datePickerMaxDate = today;
    }

    ngOnInit(): void {
        this.customer.address = new Address();
        this.datePickerMaxDate = (NgbDate.from({day: 2, month:4, year: 2023}) as NgbDate);
    }

    addCustomer() : void {
        const data = CustomerService.datafyCustomer(this.customer, false);
        console.warn(data);
        console.warn(data.address);

        console.log("Adding customer with info " + data);

        this.customerService.addCustomer(data)
        .subscribe({
            next: (res) => {
                this.hasError = false;
                this.submitted = true;
                console.log(res);
                this.delayedReload();
            },
            error: (e) => {
                this.hasError = true;
                console.error(e);
                console.log(e.error.status + " " + e.error.title);

                this.errorMessage = this.errorHelper.handleError(e);
            }
        });
    }

    delayedReload() : void {
        setTimeout(() => {
            window.location.href=HTTP_ROOT + "customer/add";
          }, 2500);
    }
}
