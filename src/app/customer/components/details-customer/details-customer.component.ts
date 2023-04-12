import { NgbDate, NgbCalendarGregorian } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorResponseUtilService } from '../../../core/helpers/errorresponseutil.service';
import { Address } from '../../../core/models/address.model';
import { Customer } from '../../../core/models/customer.model';
import { CustomerService } from '../../../core/services/customer.service';

@Component({
  selector: 'app-details-customer',
  templateUrl: './details-customer.component.html',
  styleUrls: ['./details-customer.component.css']
})
export class DetailsCustomerComponent implements OnInit {

    BASE_FIELD_CLASS = "form-control";
    READ_ONLY_FIELD_CLASS = "form-control-plaintext";
    MSG_FIELD_ALTERED = "<Field Altered>";

    customer : Customer = {
        id: undefined,
        firstname: undefined,
        lastname: undefined,
        dateofbirth: undefined,
        age: undefined,
        address: undefined
    };

    address : Address | undefined = {
        id: -1,
        streetName: "",
        houseNumber: "",
        zipCode: "",
        city: ""
    }

    getId : string | null = '';
    isViewingCustomer = false;
    isEditing = false;

    submitted = false;
    hasError = false;
    errorMessage = '';
    fieldMessages : Map<string,string> | undefined = undefined;

    datePickerMaxDate : NgbDate;
    datePickerSetDate : NgbDate;
    dateReadable : string;
    dateBackup : any;

    constructor(
        private customerService: CustomerService,
        private route: ActivatedRoute,
        private errorHelper: ErrorResponseUtilService,
    ) {
        let today = new NgbCalendarGregorian().getToday();
        this.datePickerMaxDate = today;
        this.datePickerSetDate = today;
        this.dateReadable = this.toJavaDate(today).toDateString();
    }

    ngOnInit() : void {
        if (this.route.snapshot.paramMap.has('id')) {
            const id = this.route.snapshot.paramMap.get('id');
            this.getId = id;
            this.getCustomer();
        }
    }

    getCustomer() : void {
        this.customerService.getCustomer(this.getId)
        .subscribe({
            next: (res) => {
                this.hasError = false;
                this.errorMessage = '';

                this.isViewingCustomer = true;
                this.customer = CustomerService.custofyData(res);

                this.datePickerSetDate = this.toNgbDate(this.customer)!;
                this.dateReadable = this.toJavaDate(this.datePickerSetDate).toDateString();

                console.log(res);
            },
            error: (e) => {
                this.hasError = true;
                this.errorMessage = this.errorHelper.handleError(e);
                this.isViewingCustomer = false;

                console.error(e);
                console.log(e.error.status + " " + e.error.title);
            }
        });
    }

    editCustomer() : void {
        this.isEditing = true;
        this.address = this.customer.address; // Ensures data retention.
    }

    saveCustomer() : void {
        let dateBackup = this.customer.dateofbirth;

        this.customer.dateofbirth = this.toJavaDate(this.datePickerSetDate);
        const data = CustomerService.datafyCustomer(this.customer, true);

        this.customerService.addCustomer(data)
        .subscribe({
            next: (res) => {
                this.submitted = true;
                this.isEditing = false;
                this.getCustomer();

                console.log(res);

                setTimeout(() => {
                    this.submitted = false;
                }, 2500);
            },
            error: (e) => {
                this.hasError = true;
                this.errorMessage = this.errorHelper.handleError(e);
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

    cancelEdit() : void {
        this.getCustomer();
        this.isEditing = false;
    }

    customerAddress(data: any) {
        const address = (data as Customer).address;
        return address?.streetName + " " + address?.houseNumber + ", " + address?.zipCode + " " + address?.city;
    }

    toNgbDate(data : any) {
        let doB = data.dateofbirth;
        let date = new Date(doB);

        return NgbDate.from({ year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() });
    }

    toJavaDate(data : any) {
        let ngb = (data as NgbDate);
        let date = new Date(ngb.year, ngb.month-1, ngb.day);

        return date;
    }

    getFieldClass(fieldName : string) {
        if (this.fieldMessages == undefined)
            return this.isEditing ? this.BASE_FIELD_CLASS : this.READ_ONLY_FIELD_CLASS;

        if (!this.fieldMessages.has(fieldName))
            return ( this.isEditing ? this.BASE_FIELD_CLASS : this.READ_ONLY_FIELD_CLASS ) + " is-valid";

        if (this.fieldMessages.get(fieldName) == this.MSG_FIELD_ALTERED)
            return this.isEditing ? this.BASE_FIELD_CLASS : this.READ_ONLY_FIELD_CLASS;

        return ( this.isEditing ? this.BASE_FIELD_CLASS : this.READ_ONLY_FIELD_CLASS ) + " is-invalid";
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
