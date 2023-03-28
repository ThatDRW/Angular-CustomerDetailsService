import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

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
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        if (this.route.snapshot.paramMap.has('query')) {
            const query = this.route.snapshot.paramMap.get('query');
            console.log("Detected query in route paramMap: " + query);

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
                    console.log(res);

                    this.hasError = false;
                    this.errorMessage = '';
                    this.customerList = res;
                },
                error: (e) => {
                    console.error(e);
                    console.log(e.error.status + " " + e.error.title);

                    this.hasError = true;
                    this.errorMessage = e.error.status + " " + e.error.title;
                }
            });
    }

}
