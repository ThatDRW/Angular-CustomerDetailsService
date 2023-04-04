import { Component, OnInit } from '@angular/core';
import { HTTP_ROOT } from 'src/app/href-constants.constants';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user.model';
import { ErrorResponseUtilService } from 'src/app/core/helpers/errorresponseutil.service';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

    user:User = {username:"hi",password:"pass"};
    submitted = false;
    result = "";
    hasError = false;
    errorMessage = "";

    constructor(
        private userService: UserService,
        private errorHelper: ErrorResponseUtilService,
    ) { }

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
                this.hasError = false;
                this.submitted = true;

                console.log(res);
            },
            error: (e) => {
                this.hasError = true;
                this.errorMessage = this.errorHelper.handleError(e);

                console.error(e);
                console.log(e.error.message[0]);
            }
        });
    }

    gotoLogin() : void {
        window.location.href = HTTP_ROOT + "login";
    }

}
