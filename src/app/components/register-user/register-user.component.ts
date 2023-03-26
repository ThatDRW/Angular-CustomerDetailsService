import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

    user:User = {username:"hi",password:"pass"};
    submitted = false;
    submitstring = "Not sent!";
    result = "";
    haserror = false;
    errormessage = "";

    constructor(private userService: UserService) { }

    ngOnInit(): void {

    }

    registerUser() : void {
        const data = {
            username: this.user.username,
            password: this.user.password
        };

        console.log("Registering user with info " + data);

        this.userService.registerUser(data)
        .subscribe({
            next: (res) => {
                console.log(res);
                this.haserror = false;
                this.submitted = true;
                this.submitstring = "Sent!";
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
