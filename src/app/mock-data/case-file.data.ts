import {CaseFile, Person} from '../shared/entity';
import {PERSONS} from './person.data';
import {guid} from '../shared/helpers';

let i = 0;
export const CASE_FILES: CaseFile[] = [
    createCaseFile(`file_${i}`, PERSONS[i], PERSONS[i++ + 1]),
    createCaseFile(`file_${i}`, PERSONS[i], PERSONS[i++ + 1]),
    createCaseFile(`file_${i}`, PERSONS[i], PERSONS[i++ + 1]),
    createCaseFile(`file_${i}`, PERSONS[i], PERSONS[i++ + 1]),
];

function createCaseFile(fileNo: string, claiment: Person, defendant: Person): CaseFile {
    return {
        id: guid(),
        fileNo: fileNo,
        claimentId: claiment.id,
        claiment: claiment,
        defendantId: defendant.id,
        defendant: defendant,
    };
}
