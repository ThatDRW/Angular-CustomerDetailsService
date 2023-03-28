import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.css']
})
export class AllCustomersComponent implements OnInit {

    customerList = undefined;

    constructor(private customerService : CustomerService) { }

    ngOnInit(): void {

    }

    getAllCustomers() : void {
        
    }

}
