import {CaseFile, Person} from '../shared/entity';
import {PERSONS} from './person.data';
import {guid} from '../shared/helpers';

let i = 0;
export const CASE_FILES: CaseFile[] = [
    createCaseFile(`123/2017`, PERSONS[i], PERSONS[i++ + 1]),
    createCaseFile(`249/2018`, PERSONS[i], PERSONS[i++ + 1]),
    createCaseFile(`12784/2018`, PERSONS[i], PERSONS[i++ + 1]),
    createCaseFile(`273/2017`, PERSONS[i], PERSONS[i++ + 1]),
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
