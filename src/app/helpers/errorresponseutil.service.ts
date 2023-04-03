import { Injectable } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { HTTP_ROOT } from '../href-constants.constants';

@Injectable({
    providedIn: 'root'
})
export class ErrorResponseUtilService {

    constructor(
        private tokenStorage : TokenStorageService,
    ) { }

    handleError(e : any) : string {
        if (!e.error)
            return "ErrorResponseUtilService could not resolve this ErrorResponse."
        let errorResponse = e.error;
        let errorMessage = this.parseErrorResponse(errorResponse);
        return errorMessage;
    }

    parseErrorResponse(errorResponse : any) : string {
        let messages: string[] = (errorResponse!['message'] as string[]);
        let errorMessage = messages.join("\n");

        if (errorMessage.includes("Auth Error: Invalid token."))
            window.location.href = HTTP_ROOT + "logout";

        console.warn(errorMessage);
        return errorMessage;
    }
}