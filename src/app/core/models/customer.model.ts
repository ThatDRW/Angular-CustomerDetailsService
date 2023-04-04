import { Address } from "./address.model";

export class Customer {
    id: any | undefined;
    firstname: string | undefined;
    lastname: string | undefined;
    dateofbirth: Date | undefined;
    age: number | undefined;
    address: Address | undefined;
}
