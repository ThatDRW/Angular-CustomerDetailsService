import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../core/services/token-storage.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

    constructor(
        private tokenStorage: TokenStorageService
    ) { }

    isLoggedIn = false;
    loggedInUsername = '';

    ngOnInit(): void {
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
            this.loggedInUsername = this.tokenStorage.getUser().username;
        }
    }

}
