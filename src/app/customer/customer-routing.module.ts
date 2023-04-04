import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { DetailsCustomerComponent } from './components/details-customer/details-customer.component';
import { AllCustomersComponent } from './components/all-customers/all-customers.component';
import { FindCustomerComponent } from './components/find-customer/find-customer.component';
import { authGuard } from '../core/helpers/auth.guard';

const oldroutes: Routes = [
  { path: 'customer/add', component: AddCustomerComponent },
  { path: 'customer/get', component: DetailsCustomerComponent },
  { path: 'customer/get/:id', component: DetailsCustomerComponent },
  { path: 'customer/all', component: AllCustomersComponent },
  { path: 'customer/find', component: FindCustomerComponent },
  { path: 'customer/find/:query', component: FindCustomerComponent },
];

const routes: Routes = [{
    path: 'customer',
    canActivateChild: [authGuard],
    children: [
        { path: 'add', component: AddCustomerComponent },
        { path: 'all', component: AllCustomersComponent },
        {
            path: 'find',
            children: [
                { path: '', component: FindCustomerComponent },
                { path: ':query', component: FindCustomerComponent },
            ]
        },
        {
            path: 'get',
            children: [
                { path: '', component: DetailsCustomerComponent },
                { path: ':id', component: DetailsCustomerComponent },
            ]
        }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
