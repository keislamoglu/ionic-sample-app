import {Petition} from './petition';
import {TemplateDocument} from './template-document';

export class PetitionTemplate {
    id: string;
    name: string;
    slugName: TemplateDocument;
    petitions: Petition[];
}
