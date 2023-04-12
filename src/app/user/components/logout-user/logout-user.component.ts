import { Component, OnInit } from '@angular/core';
import { HTTP_ROOT } from '../../../href-constants.constants';
import { TokenStorageService } from '../../../core/services/token-storage.service';

@Component({
  selector: 'app-logout-user',
  templateUrl: './logout-user.component.html',
  styleUrls: ['./logout-user.component.css']
})
export class LogoutUserComponent implements OnInit {

    signedOut = false;

    constructor(
        private tokenStorage: TokenStorageService
    ) {}

    ngOnInit(): void {
        this.tokenStorage.signOut();
        this.signedOut = true;
        setTimeout(() => {
            window.location.href=HTTP_ROOT;
          }, 2500);
    }

}
