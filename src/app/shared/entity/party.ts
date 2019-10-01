import {PartyType} from './party-type';

export class Party {
    id: string;
    personId: string;
    type: PartyType;
    caseFileId: string;
    crimes: string;
    relatedPersonId: string;
    registrationNo: string;
}
