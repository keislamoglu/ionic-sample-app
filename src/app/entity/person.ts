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
    claimentCaseFiles: CaseFile[] = [];
    defendantCaseFiles: CaseFile[] = [];
    petitions: Petition[] = [];

    get givenName() {
        if (this.middlename) {
            return [this.name, this.middlename].join(' ');
        }
        return this.name;
    }

    set givenName(name: string) {
        [this.name, this.middlename] = name.split(' ');
    }

    get fullName() {
        return [this.givenName, this.lastname].join(' ');
    }
}
