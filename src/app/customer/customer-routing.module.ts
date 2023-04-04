import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { DetailsCustomerComponent } from './components/details-customer/details-customer.component';
import { AllCustomersComponent } from './components/all-customers/all-customers.component';
import { FindCustomerComponent } from './components/find-customer/find-customer.component';

const routes: Routes = [
  { path: 'customer/add', component: AddCustomerComponent },
  { path: 'customer/get', component: DetailsCustomerComponent },
  { path: 'customer/get/:id', component: DetailsCustomerComponent },
  { path: 'customer/all', component: AllCustomersComponent },
  { path: 'customer/find', component: FindCustomerComponent },
  { path: 'customer/find/:query', component: FindCustomerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
