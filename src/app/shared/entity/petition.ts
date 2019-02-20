import {Person} from './person';
import {PetitionTemplate} from './petition-template';

export class Petition {
    id: string;
    name: string;
    claimentId: string;
    defendantId: string;
    petitionTemplateId: string;
    claiment: Person;
    defendant: Person;
    petitionTemplate: PetitionTemplate;
    fieldData: string; // JSON
}
