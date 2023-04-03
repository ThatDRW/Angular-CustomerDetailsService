import { NgbDate, NgbCalendarGregorian } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorResponseUtilService } from 'src/app/helpers/errorresponseutil.service';
import { Address } from 'src/app/models/address.model';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-details-customer',
  templateUrl: './details-customer.component.html',
  styleUrls: ['./details-customer.component.css']
})
export class DetailsCustomerComponent implements OnInit {

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

    datePickerMaxDate : NgbDate;
    datePickerSetDate : NgbDate;

    constructor(
        private customerService: CustomerService,
        private route: ActivatedRoute,
        private errorHelper: ErrorResponseUtilService,
    ) {
        let today = new NgbCalendarGregorian().getToday();
        this.datePickerMaxDate = today;
        this.datePickerSetDate = today;
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

                console.log(res);
            },
            error: (e) => {
                this.hasError = true;
                this.errorMessage = this.errorHelper.handleError(e);

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
        this.customer.dateofbirth = this.toJavaDate(this.datePickerSetDate);
        const data = CustomerService.datafyCustomer(this.customer, true);

        this.customerService.addCustomer(data)
        .subscribe({
            next: (res) => {
                this.submitted = true;
                this.isEditing = false;
                this.getCustomer();

                console.log(res);
                console.info("submitted: " + this.submitted)

                setTimeout(() => {
                    console.warn("saveCustomer() Timeout");
                    this.submitted = false;
                }, 5000);
            },
            error: (e) => {
                this.hasError = true;
                this.errorMessage = this.errorHelper.handleError(e);

                console.error(e);
                console.log(e.error.status + " " + e.error.title);
            }
        });
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

        return NgbDate.from({   year: date.getFullYear(),
                                month: date.getMonth() + 1,
                                day: date.getDate()
                            });
    }

    toJavaDate(data : any) {
        let ngb = (data as NgbDate);
        let date = new Date(ngb.year, ngb.month-1, ngb.day);

        return date;
    }
}
