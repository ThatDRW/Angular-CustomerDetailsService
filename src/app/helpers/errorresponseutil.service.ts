import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ErrorResponseUtilService {

    constructor() { }

    handleError(e : any) : string {
        let errorResponse = e.error;
        let errorMessage = this.parseErrorResponse(errorResponse);
        return errorMessage;
    }

    parseErrorResponse(errorResponse : any) : string {
        let messages: string[] = (errorResponse!['message'] as string[]);
        let errorMessage = messages.join("\n");
        console.warn(errorMessage);
        return errorMessage;
    }
}