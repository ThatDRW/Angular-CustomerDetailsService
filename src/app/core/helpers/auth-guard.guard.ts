import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
import { HTTP_ROOT } from '../../href-constants.constants';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate, CanActivateChild {
    MSG_AUTH_INVALID = 'Excuse me, Sir, I need you to step out of the line.';
    MSG_AUTH_ISLEGIT = 'Alright, cause no trouble...';

    constructor(
        private tokenStorage: TokenStorageService,
    ) { }

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return true;
    }
    canActivateChild( childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) :
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return true;
    }

    authFailed = (message: string, hadTokenStored: boolean) => {
        console.warn('AUTHGUARD >> ' + this.MSG_AUTH_INVALID);
        console.error('AUTHGUARD >> ' + message);

        if (hadTokenStored)
            return window.location.href = HTTP_ROOT + 'logout';

        return window.location.href = HTTP_ROOT;
    }

    checkTokenStorage = () => {
        console.info('AUTHGUARD >> Checking TokenStorage...');

        let tokenFound = this.tokenStorage.getToken() ? true : false;

        console.info('AUTHGUARD >> Token ' + ( tokenFound ? 'was found!' : 'was not found!' ));
        return tokenFound ? this.tokenStorage.getToken() : null;
    }


    authGuard = () => {
        console.info('AUTHGUARD >> Called for duty!');

        const token = this.checkTokenStorage();
        if (!token)
            return this.authFailed('Server-Computer says no.', !!token);

        console.info('AUTHGUARD >> ' + this.MSG_AUTH_ISLEGIT);
        return true;
    }
}
