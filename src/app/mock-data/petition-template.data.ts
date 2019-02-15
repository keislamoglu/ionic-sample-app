import {PetitionTemplate} from '../entity/petition-template';
import {guid, lorem} from '../helpers';
import {PETITIONS} from './petition.data';

export const PETITION_TEMPLATES: PetitionTemplate[] = [
    {id: guid(), content: lorem(45), petitions: [PETITIONS[0]]},
    {id: guid(), content: lorem(35), petitions: [PETITIONS[1]]},
    {id: guid(), content: lorem(60), petitions: [PETITIONS[2]]},
    {id: guid(), content: lorem(75), petitions: [PETITIONS[3]]},
    {id: guid(), content: lorem(25), petitions: [PETITIONS[4]]},
    {id: guid(), content: lorem(90), petitions: [PETITIONS[5]]},
];

