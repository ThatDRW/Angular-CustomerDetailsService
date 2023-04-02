import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorResponseUtilService } from 'src/app/helpers/errorresponseutil.service';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit {

    currentIndex : number | undefined = undefined;

    hasError = false;
    errorMessage = '';

    @Input()
    viewAll = true;

    @Input()
    customerList = undefined;


    constructor(
        private customerService : CustomerService,
        private router : Router,
        private errorHelper : ErrorResponseUtilService,
    ) { }

    ngOnInit(): void {
        if (this.viewAll) {
            this.getAllCustomers();
        }
    }

    getAllCustomers() : void {
        this.customerService.getAllCustomers()
            .subscribe({
                next: (res) => {
                    this.hasError = false;
                    this.errorMessage = '';
                    this.customerList = res;

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

    showCustomerDetails(data : any, index : number) : void {
        this.currentIndex = index;
        console.log('Boop ' + data.id)
        this.router.navigate(["customer/get/" + data.id]);
    }

    customerAddress(data: any) : string {
        const address = (data as Customer).address;
        return address?.streetName + " " + address?.houseNumber + ", " + address?.zipCode + " " + address?.city;
    }

}
