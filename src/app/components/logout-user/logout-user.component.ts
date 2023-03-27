import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-logout-user',
  templateUrl: './logout-user.component.html',
  styleUrls: ['./logout-user.component.css']
})
export class LogoutUserComponent implements OnInit {

    signedOut = false;

    constructor(
        private tokenStorage: TokenStorageService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.tokenStorage.signOut();
        this.signedOut = true;
        setTimeout(() => {
            window.location.href="http://localhost:4200";
          }, 6000);
    }

}
