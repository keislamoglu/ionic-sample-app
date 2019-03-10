import {Party} from './party';

export class Person {
    id: string;
    name: string;
    middlename?: string;
    lastname: string;
    nId: string;
    address: string;
    mernisAddress: string;
    phone: string;
    fatherName: string;
    motherName: string;
    birthPlace: string;
    birthDate: Date;
    parties: Party[];
}
