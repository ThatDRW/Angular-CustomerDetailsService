import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { LogoutUserComponent } from './components/logout-user/logout-user.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { authGuard } from '../core/helpers/auth.guard';


const oldroutes: Routes = [
  { path: 'user/register', component: RegisterUserComponent },
  { path: 'login', component: LoginUserComponent },
  { path: 'logout', component: LogoutUserComponent },
  { path: 'user/profile', component: ProfileUserComponent },
];

const routes: Routes = [{
    path: '',
    children: [
        { path: 'login', component: LoginUserComponent },
        { path: 'logout', component: LogoutUserComponent },
        { path: 'user/register', component: RegisterUserComponent },
        {
            path: 'user',
            canActivateChild: [authGuard],
            children: [
                { path: 'profile', component: ProfileUserComponent },
            ]
        }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
