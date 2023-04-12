import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { DetailsCustomerComponent } from './components/details-customer/details-customer.component';
import { ListCustomersComponent } from './components/list-customers/list-customers.component';
import { AllCustomersComponent } from './components/all-customers/all-customers.component';
import { FindCustomerComponent } from './components/find-customer/find-customer.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '../core/core.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AddCustomerComponent,
    DetailsCustomerComponent,
    ListCustomersComponent,
    AllCustomersComponent,
    FindCustomerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    CoreModule,
    CustomerRoutingModule,
    HttpClientModule
  ],
  exports: [
    ListCustomersComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CustomerModule { }
