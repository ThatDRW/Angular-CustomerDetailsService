import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorResponseUtilService } from '../../../core/helpers/errorresponseutil.service';
import { Customer } from '../../../core/models/customer.model';
import { CustomerService } from '../../../core/services/customer.service';

@Component({
  selector: 'app-find-customer',
  templateUrl: './find-customer.component.html',
  styleUrls: ['./find-customer.component.css']
})
export class FindCustomerComponent implements OnInit {

    customerList = undefined;
    searchQuery : string | null = '';

    hasError = false;
    errorMessage = '';

    constructor(
        private customerService: CustomerService,
        private route: ActivatedRoute,
        private errorHelper: ErrorResponseUtilService,
    ) { }

    ngOnInit(): void {
        if (this.route.snapshot.paramMap.has('query')) {
            const query = this.route.snapshot.paramMap.get('query');

            this.searchQuery = query;
            this.updateCustomerList();
        }
    }

    searchButtonClick() : void {
        window.location.href = 'customer/find/' + this.searchQuery;
    }

    updateCustomerList() : void {
        this.customerService.findCustomers(this.searchQuery)
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
