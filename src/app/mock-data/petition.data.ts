import {Person, Petition, PetitionTemplate} from '../shared/entity';
import {guid} from '../shared/helpers';
import {PERSONS} from './person.data';
import {PETITION_TEMPLATES} from './petition-template.data';

let i = 0;
export const PETITIONS: Petition[] = [
    createPetition(PERSONS[i], PERSONS[i + 1], PETITION_TEMPLATES[i++]),
    createPetition(PERSONS[i], PERSONS[i + 1], PETITION_TEMPLATES[i++]),
    createPetition(PERSONS[i], PERSONS[i + 1], PETITION_TEMPLATES[i++]),
    createPetition(PERSONS[i], PERSONS[i + 1], PETITION_TEMPLATES[i++]),
];

function createPetition(claiment: Person, defendant: Person, template: PetitionTemplate): Petition {
    const fieldData = JSON.stringify({claiment, defendant});
    return {
        id: guid(),
        name: template.name,
        petitionTemplate: template,
        petitionTemplateId: template.id,
        claimentId: claiment.id,
        claiment: claiment,
        defendantId: defendant.id,
        defendant: defendant,
        fieldData,
    }
}
