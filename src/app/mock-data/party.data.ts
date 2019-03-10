import {CaseFile, Party, PartyType, Person} from '../shared/entity';
import {guid} from '../shared/helpers';
import {PERSONS} from './person.data';
import {CASE_FILES} from './case-file.data';

let i = 0;
export const PARTIES: Party[] = [
    createParty(PartyType.Suspected, PERSONS[i], CASE_FILES[i++]),
    createParty(PartyType.AffectedByCrime, PERSONS[i], CASE_FILES[i++]),
    createParty(PartyType.Complainant, PERSONS[i], CASE_FILES[i++]),
];

function createParty(type: PartyType, person: Person, caseFile: CaseFile): Party {
    return {
        id: guid(),
        personId: person.id,
        person: void 0,
        caseFileId: caseFile.id,
        caseFile: void 0,
        type: type,
        petitions: [],
    };
}
