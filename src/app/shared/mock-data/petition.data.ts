import {Party, Petition, PetitionTemplate} from '../entity';
import {guid} from '../helpers';
import {PETITION_TEMPLATES} from './petition-template.data';
import {PARTIES} from './party.data';

let i = 0;
export const PETITIONS: Petition[] = [
    createPetition(PARTIES[i], PETITION_TEMPLATES[i++]),
    createPetition(PARTIES[i], PETITION_TEMPLATES[i++]),
];

function createPetition(party: Party, template: PetitionTemplate): Petition {

    return {
        id: guid(),
        name: `Dilekçe-${i + 1}`,
        templateId: template.id,
        date: new Date().toLocaleDateString(),
        template: void 0,
        party: party,
        partyId: party.id,
        fileName: guid(),
        extraData: void 0
    };
}
