import {PartyType} from './party-type';
import {CaseFile} from './case-file';
import {Petition} from './petition';
import {Person} from './person';

export class Party {
    id: string;
    personId: string;
    type: PartyType;
    caseFileId: string;
    crimes: string;
    relatedPersonId: string;
    registrationNo: string;
    petitionIds: string[];
    person: Person;
    relatedPerson?: Person;
    caseFile: CaseFile;
    petitions: Petition[] = [];
}
