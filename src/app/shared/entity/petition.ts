import {PetitionTemplate} from './petition-template';
import {Party} from './party';

export class Petition {
    id: string;
    name: string;
    fileName?: string;
    partyId: string;
    party: Party;
    templateId: string;
    template: PetitionTemplate;
    date: Date;
}
