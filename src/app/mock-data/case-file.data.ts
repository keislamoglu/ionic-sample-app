import {CaseFile} from '../entity/case-file';
import {PERSONS} from './person.data';
import {guid} from '../helpers';
import {Person} from '../entity/person';

let i = 0;
export const CASE_FILES: CaseFile[] = [
    createCaseFile(`file_${i}`, PERSONS[i], PERSONS[i++ + 1]),
    createCaseFile(`file_${i}`, PERSONS[i], PERSONS[i++ + 1]),
    createCaseFile(`file_${i}`, PERSONS[i], PERSONS[i++ + 1]),
    createCaseFile(`file_${i}`, PERSONS[i], PERSONS[i++ + 1]),
];

function createCaseFile(fileNo: string, claiment: Person, defendant: Person) {
    const caseFile = new CaseFile();
    caseFile.id = guid();
    caseFile.fileNo = fileNo;
    caseFile.claimentId = claiment.id;
    caseFile.claiment = claiment;
    caseFile.defendantId = defendant.id;
    caseFile.defendant = defendant;
    return caseFile;
}
