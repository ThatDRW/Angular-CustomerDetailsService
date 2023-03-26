import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
    user:User = {username:"", password:""};
    submitted = false;
    haserror = false;
    errormessage = "";

    constructor(private userService: UserService) {}

    ngOnInit(): void {

    }

    loginUser() : void {
        const data = {
            username: this.user.username,
            password: this.user.password
        }

        console.log("Attempting login for user: " + this.user.username);

        this.userService.loginUser(data)
        .subscribe({
            next: (res) => {
                console.log(res);
                this.haserror = false;
                this.submitted = true;
            },
            error: (e) => {
                console.error(e);
                this.haserror = true;
                console.log(e.error.message[0]);
                this.errormessage = e.error.message[0];
            }
        });

    }
}
