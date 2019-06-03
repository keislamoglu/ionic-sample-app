import {Party} from './party';
import {Address} from './address';

export class Person {
    id: string;
    name: string;
    middlename?: string;
    lastname: string;
    nId: string;
    addressId: string;
    mernisAddressId?: string;
    phone: string;
    fatherName: string;
    motherName: string;
    birthPlace: string;
    address: Address;
    mernisAddress?: Address;
    birthDate: string;
    parties: Party[];
}
