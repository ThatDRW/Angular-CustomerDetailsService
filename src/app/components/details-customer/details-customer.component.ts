import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-details-customer',
  templateUrl: './details-customer.component.html',
  styleUrls: ['./details-customer.component.css']
})
export class DetailsCustomerComponent implements OnInit {

    customer:Customer = {
        id: undefined,
        firstname: undefined,
        lastname: undefined,
        dateofbirth: undefined,
        age: undefined,
        address: undefined
    };

    getId : string | null = '';
    hasError = false;
    errorMessage = '';
    isViewingCustomer = false;
    isEditing = false;
    submitted = false;


    constructor(
        private customerService: CustomerService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() : void {
        if (this.route.snapshot.paramMap.has('id')) {
            const id = this.route.snapshot.paramMap.get('id');
            console.log("Detected id in route paramMap: " + id);

            this.getId = id;
            this.getCustomer();
        }

    }

    getCustomer() : void {
        this.customerService.getCustomer(this.getId)
        .subscribe({
            next: (res) => {
                console.log(res);

                this.hasError = false;
                this.errorMessage = '';
                this.isViewingCustomer = true;
                this.customer = CustomerService.custofyData(res);
                this.submitted = false;
            },
            error: (e) => {
                console.error(e);
                console.log(e.error.status + " " + e.error.title);

                this.hasError = true;
                if (e.error.status)
                    this.errorMessage = e.error.status + " " + e.error.title;
                else
                    this.errorMessage = 'Id not found! Please enter a valid Customer Id.';
            }
        });
    }

    editCustomer() : void {
        this.isEditing = true;
    }

    saveCustomer() : void {
        const data = CustomerService.datafyCustomer(this.customer, true);

        this.customerService.addCustomer(data)
        .subscribe({
            next: (res) => {
                console.log(res);
                this.submitted = true;
                this.isEditing = false;
                this.getCustomer();
            },
            error: (e) => {
                console.error(e);
                this.hasError = true;
                console.log(e.error.status + " " + e.error.title);
                this.errorMessage = e.error.status + " " + e.error.title;
            }
        });
    }

    cancelEdit() : void {
        this.getCustomer();
        this.isEditing = false;
    }
}
