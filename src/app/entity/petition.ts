import {Person} from './person';
import {PetitionTemplate} from './petition-template';

export class Petition {
    id: string;
    person: Person;
    petitionTemplate: PetitionTemplate;
}
