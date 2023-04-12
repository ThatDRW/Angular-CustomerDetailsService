import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';

import { authInterceptorProviders } from './core/helpers/auth.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
  ],
  imports: [
    UserModule,
    CustomerModule,
    SharedModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    CoreModule,
    AppRoutingModule,
  ],
  providers: [
    authInterceptorProviders,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
