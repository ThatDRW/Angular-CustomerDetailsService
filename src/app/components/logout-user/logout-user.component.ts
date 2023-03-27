import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-logout-user',
  templateUrl: './logout-user.component.html',
  styleUrls: ['./logout-user.component.css']
})
export class LogoutUserComponent implements OnInit {

    constructor(
        private tokenStorage: TokenStorageService
    ) {}

    ngOnInit(): void {
        this.tokenStorage.signOut();
    }

}
