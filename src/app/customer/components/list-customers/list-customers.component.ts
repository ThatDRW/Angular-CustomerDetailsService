import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorResponseUtilService } from 'src/app/core/helpers/errorresponseutil.service';
import { Customer } from 'src/app/core/models/customer.model';
import { CustomerService } from 'src/app/core/services/customer.service';

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

                    this.batchCustofy();

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

    batchCustofy() {
        if (this.customerList == undefined)
            return;

        // NOTE : Typecasting 'unknown' dataformat ARRAYS to pre-determined object[]. WHAT.
        let length = (this.customerList as Customer[]).length;

        // Custofy each entry of the list to calculate Age.
        for (var i=0; i < length; i++) {
            (this.customerList as Customer[])[i] = CustomerService.custofyData((this.customerList as Customer[]).at(i)!);
        }
    }
}
