import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './components/landing/landing.component';

import { AddCustomerComponent } from './customer/components/add-customer/add-customer.component';
import { DetailsCustomerComponent } from './customer/components/details-customer/details-customer.component';
import { AllCustomersComponent } from './customer/components/all-customers/all-customers.component';
import { FindCustomerComponent } from './customer/components/find-customer/find-customer.component';


const routes: Routes = [
  { path: '', component: LandingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
