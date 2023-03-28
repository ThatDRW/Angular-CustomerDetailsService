import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit {

    customerList = undefined;

    constructor(private customerService : CustomerService) { }

    ngOnInit(): void {

    }

    getAllCustomers() : void {

    }

}
