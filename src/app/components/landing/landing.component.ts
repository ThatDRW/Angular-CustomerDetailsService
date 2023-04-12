import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../core/services/token-storage.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

    isLoggedIn = false;

    constructor(
        private tokenStorage : TokenStorageService
    ) {}

    ngOnInit(): void {
        if (this.tokenStorage.getToken())
            this.isLoggedIn = true;
    }

}
