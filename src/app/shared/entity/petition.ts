import {Person} from './person';
import {PetitionTemplate} from './petition-template';
import {CaseFile} from './case-file';
import {ProsecutionOffice} from './prosecution-office';

export class Petition {
    id: string;
    name: string;
    fileName?: string;
    claimentId: string;
    defendantId: string;
    caseFileId: string;
    prosecutionOfficeId: string;
    petitionTemplateId: string;
    prosecutionOffice: ProsecutionOffice;
    caseFile: CaseFile;
    claiment: Person;
    defendant: Person;
    petitionTemplate: PetitionTemplate;
    date: Date;
    fieldData: string; // JSON
}
