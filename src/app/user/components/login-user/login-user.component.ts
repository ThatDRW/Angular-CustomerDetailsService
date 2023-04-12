import { Component, OnInit } from '@angular/core';
import { ErrorResponseUtilService } from '../../../core/helpers/errorresponseutil.service';
import { HTTP_ROOT } from '../../../href-constants.constants';
import { User } from '../../../core/models/user.model';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
    user:User = {username:"", password:""};
    submitted = false;
    hasError = false;
    errorMessage = "";

    isLoggedIn = false;
    isLoginFailed = false;
    debugToken = '';

    constructor(
        private userService: UserService,
        private tokenStorage: TokenStorageService,
        private errorHelper: ErrorResponseUtilService,
    ) {}

    ngOnInit(): void {
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
        }
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
                    console.log(res.headers.get("authorization"));
                    this.debugToken = res.headers.get('authorization');
                    this.tokenStorage.saveToken(res.headers.get('authorization'));
                    this.tokenStorage.saveUser({username: this.user.username});

                    console.log(res);

                    this.hasError = false;
                    this.errorMessage = '';
                    this.submitted = true;

                    setTimeout(() => {
                        this.redirect(HTTP_ROOT);
                    }, 2500);
                },
                error: (e) => {
                    this.hasError = true;
                    this.errorMessage = this.errorHelper.handleError(e);

                    console.error(e);
                    console.log(e.error);
                }
            });
    }

    private redirect(to:string) : void {
        window.location.href=to;
    }
}
