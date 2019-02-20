import {Petition} from './petition';

export class PetitionTemplate {
    id: string;
    name: string;
    content: string;
    requiredFields: string; // JSON
    petitions: Petition[];
}
