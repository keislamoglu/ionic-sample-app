import {CaseFile} from '../entity/case-file';
import {PERSONS} from './person.data';
import {guid} from '../helpers';

let i = 0;
export const CASE_FILES: CaseFile[] = [
    {id: guid(), fileNo: `file_${i}`, claiment: PERSONS[i], defendant: PERSONS[i++ + 1]},
    {id: guid(), fileNo: `file_${i}`, claiment: PERSONS[i], defendant: PERSONS[i++ + 1]},
    {id: guid(), fileNo: `file_${i}`, claiment: PERSONS[i], defendant: PERSONS[i++ + 1]},
    {id: guid(), fileNo: `file_${i}`, claiment: PERSONS[i], defendant: PERSONS[i + 1]},
];
