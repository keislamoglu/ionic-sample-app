import {Person} from './person';
import {PetitionTemplate} from './petition-template';

export class Petition {
    id: string;
    personId: string;
    petitionTemplateId: string;
    person: Person;
    petitionTemplate: PetitionTemplate;
}
