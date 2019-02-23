import {CaseFile, Person, Petition, PetitionTemplate, ProsecutionOffice, UserInfo} from '../shared/entity';
import {guid} from '../shared/helpers';
import {PERSONS} from './person.data';
import {PETITION_TEMPLATES} from './petition-template.data';
import {PROSECUTION_OFFICES} from './prosecution-office.data';
import {CASE_FILES} from './case-file.data';
import {USER_INFOS} from './user-info.data';

let i = 0;
export const PETITIONS: Petition[] = [
    createPetition(PERSONS[i], PERSONS[i + 1], PROSECUTION_OFFICES[i], CASE_FILES[i], USER_INFOS[0], PETITION_TEMPLATES[i++]),
    createPetition(PERSONS[i], PERSONS[i + 1], PROSECUTION_OFFICES[i], CASE_FILES[i], USER_INFOS[0], PETITION_TEMPLATES[i++]),
    createPetition(PERSONS[i], PERSONS[i + 1], PROSECUTION_OFFICES[i], CASE_FILES[i], USER_INFOS[0], PETITION_TEMPLATES[i++]),
];

function createPetition(claiment: Person,
                        defendant: Person,
                        prosecutionOffice: ProsecutionOffice,
                        caseFile: CaseFile,
                        userInfo: UserInfo,
                        template: PetitionTemplate): Petition {
    const fieldData = {claiment, defendant, caseFile, userInfo, prosecutionOffice, date: new Date()};
    const fieldDataJSON = JSON.stringify(fieldData);
    return {
        id: guid(),
        name: template.name,
        petitionTemplate: template,
        petitionTemplateId: template.id,
        claimentId: claiment.id,
        defendantId: defendant.id,
        prosecutionOfficeId: prosecutionOffice.id,
        caseFileId: caseFile.id,
        claiment,
        defendant,
        prosecutionOffice,
        caseFile,
        date: fieldData.date,
        fieldData: fieldDataJSON,
    };
}
