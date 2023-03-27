import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';
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

    isLoggedIn = false;
    isLoginFailed = false;
    debugToken = '';

    constructor(
        private userService: UserService,
        private tokenStorage: TokenStorageService,
        private router: Router
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
                this.haserror = false;
                this.submitted = true;
                setTimeout(() => {
                    // this.router.navigate(['']);
                    window.location.href="http://localhost:4200";
                  }, 5000);
            },
            error: (e) => {
                console.error(e);
                this.haserror = true;
                console.log(e.error);
                this.errormessage = e.error;
            }
        });

    }
}
