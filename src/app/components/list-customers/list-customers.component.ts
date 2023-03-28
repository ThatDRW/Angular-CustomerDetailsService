import { Component, Input, OnInit } from '@angular/core';
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


    constructor(private customerService : CustomerService) { }

    ngOnInit(): void {
        if (this.viewAll) {
            this.getAllCustomers();
        }
    }

    getAllCustomers() : void {
        this.customerService.getAllCustomers()
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

    setActiveCustomer(data : any, index : number) : void {
        this.currentIndex = index;
        console.log('Boop ' + index)
    }

}
