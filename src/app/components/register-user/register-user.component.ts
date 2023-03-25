import { Component } from '@angular/core';
import { User } from '../../entity/User';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {

  user:User = {username:"",password:""};

}
