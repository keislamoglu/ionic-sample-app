import {Person} from './person';
import {PartyType} from './party-type';
import {CaseFile} from './case-file';
import {Petition} from './petition';

export class Party {
    id: string;
    personId: string;
    person: Person;
    type: PartyType;
    caseFileId: string;
    caseFile: CaseFile;
    petitions: Petition[];
}
