import { inject } from "@angular/core";

import { TokenStorageService } from "../services/token-storage.service";
import { HTTP_ROOT } from "../../href-constants.constants";

const MSG_AUTH_INVALID = 'Excuse me, Sir, I need you to step out of the line.';
const MSG_AUTH_ISLEGIT = 'Alright, cause no trouble...';
const tokenStorage = inject( TokenStorageService );



const authFailed = (message: string, hadTokenStored: boolean) => {
    console.warn('AUTHGUARD >> ' + MSG_AUTH_INVALID);
    console.error('AUTHGUARD >> ' + message);

    if (hadTokenStored)
        return window.location.href = HTTP_ROOT + 'logout';

    return window.location.href = HTTP_ROOT;
}

const checkTokenStorage = () => {
    console.info('AUTHGUARD >> Checking TokenStorage...');

    let tokenFound = tokenStorage.getToken() ? true : false;

    console.info('AUTHGUARD >> Token ' + ( tokenFound ? 'was found!' : 'was not found!' ));
    return tokenFound ? tokenStorage.getToken() : null;
}


export const authGuard = () => {
    console.info('AUTHGUARD >> Called for duty!');

    const token = checkTokenStorage();
    if (!token)
        return authFailed('Server-Computer says no.', !!token);

    console.info('AUTHGUARD >> ' + MSG_AUTH_ISLEGIT);
    return true;
}
