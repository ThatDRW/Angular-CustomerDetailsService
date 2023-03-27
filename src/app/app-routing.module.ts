import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterUserComponent } from './components/register-user/register-user.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { LogoutUserComponent } from './components/logout-user/logout-user.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'user/register', component: RegisterUserComponent },
  { path: 'login', component: LoginUserComponent },
  { path: 'logout', component: LogoutUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
