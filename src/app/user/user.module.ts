import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { LogoutUserComponent } from './components/logout-user/logout-user.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    RegisterUserComponent,
    LoginUserComponent,
    LogoutUserComponent,
    ProfileUserComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    CoreModule,
    UserRoutingModule,
  ]
})
export class UserModule { }
