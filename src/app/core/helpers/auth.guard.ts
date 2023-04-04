import { inject } from "@angular/core";
import { Router } from "@angular/router";

import { TokenStorageService } from "../services/token-storage.service";

export const authGuard = () => {
    console.info('AUTHGUARD >> Called for duty!');

    console.info('AUTHGUARD >> Injecting Dependencies...');
    const tokenStorage = inject( TokenStorageService );
    const router = inject( Router );

    console.info('AUTHGUARD >> Checking TokenStorage...');
    let tokenFound = tokenStorage.getToken() ? true : false;
    let tokenMsg = tokenFound ? 'was found!' : 'was not found!'
    console.info('AUTHGUARD >> Token ' + tokenMsg);

    if (tokenFound) {
        console.info('AUTHGUARD >> Alright, cause no trouble...');
        return true;
    }

    console.info('AUTHGUARD >> Excuse me, Sir, I need you to step out of the line.');
    return router.parseUrl('/');
}
