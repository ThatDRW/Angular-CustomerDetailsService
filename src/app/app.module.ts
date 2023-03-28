import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { LandingComponent } from './components/landing/landing.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { LoginUserComponent } from './components/login-user/login-user.component';

import { authInterceptorProviders } from './helpers/auth.interceptor';
import { LogoutUserComponent } from './components/logout-user/logout-user.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { DetailsCustomerComponent } from './components/details-customer/details-customer.component';
import { AllCustomersComponent } from './components/all-customers/all-customers.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    LandingComponent,
    NavigationBarComponent,
    LoginUserComponent,
    LogoutUserComponent,
    AddCustomerComponent,
    DetailsCustomerComponent,
    AllCustomersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    authInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
