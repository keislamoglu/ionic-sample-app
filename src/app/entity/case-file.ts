import {Person} from './person';

export class CaseFile {
    id: string;
    fileNo: string;
    claimentId: string;
    defendantId: string;
    claiment: Person;
    defendant: Person;
}
