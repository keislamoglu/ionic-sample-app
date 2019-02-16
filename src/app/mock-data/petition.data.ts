import {Petition} from '../entity/petition';
import {guid} from '../helpers';
import {PERSONS} from './person.data';
import {PetitionTemplate} from '../entity/petition-template';
import {Person} from '../entity/person';
import {PETITION_TEMPLATES} from './petition-template.data';

let i = 0;
export const PETITIONS: Petition[] = [
    createPetition(PERSONS[i], PETITION_TEMPLATES[i++]),
    createPetition(PERSONS[i], PETITION_TEMPLATES[i++]),
    createPetition(PERSONS[i], PETITION_TEMPLATES[i++]),
    createPetition(PERSONS[i], PETITION_TEMPLATES[i++]),
];

function createPetition(person: Person, template: PetitionTemplate) {
    const petition = new Petition();
    petition.id = guid();
    petition.petitionTemplate = template;
    petition.petitionTemplateId = template.id;
    petition.person = person;
    return petition;
}
