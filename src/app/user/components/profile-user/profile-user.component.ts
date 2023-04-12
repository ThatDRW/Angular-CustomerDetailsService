import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../core/services/token-storage.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {

    username = '';
    foundUser = false;
    eggman = false;

    constructor(
        private tokenStorage: TokenStorageService
    ) {}

    ngOnInit(): void {
        if (this.tokenStorage.getToken()) {
            this.username = this.tokenStorage.getUser().username;
            this.foundUser = true;
        }

        if (this.foundUser) {
            if (this.username == 'eggman') {
                this.eggman = true;
            }
        }
    }
}
