import { Injectable } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { HTTP_ROOT } from '../../href-constants.constants';

@Injectable({
    providedIn: 'root'
})
export class ErrorResponseUtilService {

    FIELD_MAP : Map<string, string> = new Map([
        // Customer
        ['First Name', 'firstname'],
        ['Last Name', 'lastname'],
        ['Date of Birth', 'dateofbirth'],
        ['Age', 'age'],
        ['Address', 'address'],

        // Address
        ['Street Name', 'streetname'],
        ['House Number', 'housenumber'],
        ['Zip Code', 'zipcode'],
        ['City', 'city'],
        //['', ''],

        // User
        ['Username', 'username'],
        ['Password', 'password'],
    ]);

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

    /**
     * Splits all ErrorResponse messages into seperate messages per field.
     * Each message is mapped to field id keys.
     * @param messages Parsed ErrorResponse messages. (Format: <Field Name> <Error Message>, split by newline.)
     * @returns A Map of messages per field.
     * `Map<field id:string, messages:string>`
     */
    parseFieldMessages(messages : string) : Map<string, string> {
        let fieldMessages = new Map<string, string>();

        for (var message of messages.split('\n')) {
            let fieldId = this.findFieldId(message);

            // GUARD: Skip if fieldId not found.
            if (!fieldId) continue;

            if (!fieldMessages.has(fieldId as string))
                fieldMessages.set(fieldId as string, message); // Create new entry.
            else {
                fieldMessages.set( // Append to existing entry.
                    fieldId as string,
                    fieldMessages.get(fieldId as string)! + "\n" + message
                );
            }
        }

        return fieldMessages;
    }

    /**
     * Tries to find the Field id matching to the ErrorResponse Message in FIELD_MAP.
     * Field Names are either 1, 2 or 3 words long and is always at the start of an ErrorResponseMessage.
     * It will search in descending order of word count (3, 2, 1).
     * @param message Single ErroResponse message.
     * @returns `fieldId:string` if matching key is found.
     * @returns `false:boolean` if no matching key is found.
     */
    findFieldId(message : string) : string | boolean {
        let words = message.split(' ');

        // GUARD : Can't be a valid ErrorResponse Field message.
        if (words.length <= 3)
            return false;

        let options = [
            words[0] + " " + words[1] + " " + words[2],
            words[0] + " " + words[1],
            words[0]
        ];

        for (var option of options) {
            if (this.FIELD_MAP.has(option))
                return this.FIELD_MAP.get(option)!;
        }

        return false;
    }
}