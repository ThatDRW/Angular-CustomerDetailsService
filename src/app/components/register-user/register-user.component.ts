import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../entity/User';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {

  user:User = {username:"",password:""};


  constructor(private userService: UserService) {
  }

  registerUser() {
    this.userService.registerUser(this.user);
  }

}
