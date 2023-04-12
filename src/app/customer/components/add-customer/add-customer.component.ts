import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from '../../../core/models/customer.model';
import { CustomerService } from '../../../core/services/customer.service';

import { HTTP_ROOT } from '../../../href-constants.constants';

import { Address } from '../../../core/models/address.model';
import { ErrorResponseUtilService} from '../../../core/helpers/errorresponseutil.service';
import { NgbDate, NgbDatepicker, NgbCalendarGregorian } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

    BASE_FIELD_CLASS = "form-control";
    MSG_FIELD_ALTERED = "<Field Altered>";

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
    fieldMessages : Map<string,string> | undefined = undefined;
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
    }

    addCustomer() : void {
        let dateBackup = this.customer.dateofbirth;

        this.customer.dateofbirth = this.toJavaDate(this.customer.dateofbirth);
        const data = CustomerService.datafyCustomer(this.customer, false);

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
                this.errorMessage = this.errorHelper.handleError(e);

                // Rollback Conversion.
                this.customer.dateofbirth = dateBackup;
                this.updateFieldMessages();

                console.error(e);
                console.log(e.error.status + " " + e.error.title);
            }
        });
    }

    updateFieldMessages() {
        this.fieldMessages = this.errorHelper.parseFieldMessages(this.errorMessage!);

        console.info(this.fieldMessages);
    }

    delayedReload() : void {
        setTimeout(() => {
            window.location.href=HTTP_ROOT + "customer/add";
          }, 2500);
    }

    toJavaDate(data : any) {
        let ngb = (data as NgbDate);
        let date = new Date(ngb.year, ngb.month-1, ngb.day);

        return date;
    }

    getFieldClass(fieldName : string) {
        if (this.fieldMessages == undefined)
            return this.BASE_FIELD_CLASS;

        if (!this.fieldMessages.has(fieldName))
            return this.BASE_FIELD_CLASS + " is-valid";

        if (this.fieldMessages.get(fieldName) == this.MSG_FIELD_ALTERED)
            return this.BASE_FIELD_CLASS;

        return this.BASE_FIELD_CLASS + " is-invalid";
    }

    fieldAltered(fieldName : string) {
        console.info("fieldAltered >> " + fieldName + " changed")
        if (this.fieldMessages == undefined)
            return;

        if (!this.fieldMessages.has(fieldName))
            return;

        this.fieldMessages.set(fieldName, this.MSG_FIELD_ALTERED);
        return;
    }
}
