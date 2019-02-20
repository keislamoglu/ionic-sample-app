import {CaseFile} from './case-file';
import {Petition} from './petition';

export class Person {
    id: string;
    name: string;
    middlename?: string;
    lastname: string;
    nId: string;
    address: string;
    phone: string;
    claimentCaseFiles: CaseFile[];
    defendantCaseFiles: CaseFile[];
    petitions: Petition[];
}
