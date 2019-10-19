import {CaseFile} from './case-file';
import {PetitionTemplate} from './petition-template';
import {Party} from './party';

export class Petition {
    id: string;
    name: string;
    fileName?: string;
    templateId: string;
    date: string;
    /**
     * The extra data will be stored in JSON format
     */
    extraData?: string;
    caseFileId: string;
    partyIds: string[];
    caseFile: CaseFile;
    template: PetitionTemplate;
    /**
     * Stand for parties being specific to the petition.
     * e.g. the petition for invitation to conciliation has only one party.
     * On the other hand, the conciliation report has all parties.
     */
    parties: Party[];
}
