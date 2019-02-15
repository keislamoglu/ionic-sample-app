import {Petition} from '../entity/petition';
import {guid} from '../helpers';
import {PERSONS} from './person.data';
import {PETITION_TEMPLATES} from './petition-template.data';

let i = 0;
export const PETITIONS: Petition[] = [
    {id: guid(), person: PERSONS[i], petitionTemplate: PETITION_TEMPLATES[i++]},
    {id: guid(), person: PERSONS[i], petitionTemplate: PETITION_TEMPLATES[i++]},
    {id: guid(), person: PERSONS[i], petitionTemplate: PETITION_TEMPLATES[i++]},
    {id: guid(), person: PERSONS[i], petitionTemplate: PETITION_TEMPLATES[i++]},
    {id: guid(), person: PERSONS[i], petitionTemplate: PETITION_TEMPLATES[i++]},
    {id: guid(), person: PERSONS[i], petitionTemplate: PETITION_TEMPLATES[i]},
];
